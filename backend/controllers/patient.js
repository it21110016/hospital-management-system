const Patient = require("../moduls/patient"); // Import your Patient model
const nodemailer = require("nodemailer"); // For email notifications
const { SinchClient } = require("@sinch/sdk-core");

const sinchClient = new SinchClient({
  projectId: process.env.SINCH_PROJECT_ID,
  keyId: process.env.SINCH_ACCESS_KEY_ID,
  keySecret: process.env.SINCH_ACCESS_KEY_SECRET,
});

// Ensure the phone number is in the correct format
function formatPhoneNumber(phone) {
    // If it doesn't start with a "+", prepend the country code.
    if (!phone.startsWith("+")) {
        return `+94${phone.slice(1)}`; // Assuming all numbers are Sri Lankan, starting with "0"
    }
    return phone;
}

// SMS Setup
async function sendSmsNotification(to, message) {
  try {
    // Format the phone number correctly
    const formattedPhone = formatPhoneNumber(to);

    // Send SMS via Sinch
    const response = await sinchClient.sms.batches.send({
      sendSMSRequestBody: {
        to: [formattedPhone], // Use the formatted phone number
        from: process.env.SINCH_SENDER_NUMBER,
        body: message,
      },
    });
    console.log("SMS sent successfully:", JSON.stringify(response));
  } catch (error) {
    console.error("Error sending SMS via Sinch:", error.message);
    // Handle specific error codes, log details, or notify an admin
    if (error.statusCode === 400) {
      console.error(
        "Bad Request - check the phone number format or other parameters."
      );
    }
    // Continue to handle the request gracefully without crashing
  }
}

// Email Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendEmailNotification(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

exports.sendEmergencyNotification = async (req, res) => {
  try {
    const patientId = req.params.id;

    // Find the patient by ID
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if patient status is "Critical" or "Emergency"
    if (patient.status !== "Critical" && patient.status !== "Emergency") {
      return res
        .status(400)
        .json({ message: "Patient status is not Critical or Emergency" });
    }

    const emergencyContact = patient.emergencyContact;

    if (!emergencyContact) {
      return res
        .status(400)
        .json({ message: "Emergency contact information is missing" });
    }

    // Construct the alert message
    const message = `Alert: Patient ${patient.firstName} is in a critical state!`;

    // Send Email
    if (emergencyContact.email) {
      sendEmailNotification(emergencyContact.email, "Emergency Alert", message);
    }

    // Send SMS
    if (emergencyContact.phone) {
      sendSmsNotification(emergencyContact.phone, message);
    }

    res.status(200).json({ message: "Notifications sent successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Error sending notifications",
      error: error.message,
    });
  }
};

// Add a new patient
exports.addPatient = async (req, res) => {
  try {
    const patientData = {
      firstName: req.body.firstName,
      age: req.body.age,
      gender: req.body.gender,
      contactNumber: req.body.contactNumber,
      address: req.body.address,
      illness: req.body.illness,
      doctorName: req.body.doctorName,
      treatmentName: req.body.treatmentName,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      // Emergency contact details
      emergencyContact: {
        name: req.body.emergencyContact.name,
        phone: req.body.emergencyContact.phone,
        email: req.body.emergencyContact.email,
        relation: req.body.emergencyContact.relation,
      },
      caregiverNotification: req.body.caregiverNotification || false,
    };

    const newPatient = new Patient(patientData);
    const savedPatient = await newPatient.save();
    res.status(201).json({
      message: "Patient added successfully!",
      patient: savedPatient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding patient",
      error: error.message,
    });
  }
};

// Update an existing patient
exports.updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;

    const updatedData = {
      firstName: req.body.firstName,
      age: req.body.age,
      gender: req.body.gender,
      contactNumber: req.body.contactNumber,
      address: req.body.address,
      illness: req.body.illness,
      doctorName: req.body.doctorName,
      treatmentName: req.body.treatmentName,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      // Emergency contact details
      emergencyContact: {
        name: req.body.emergencyContact.name,
        phone: req.body.emergencyContact.phone,
        email: req.body.emergencyContact.email,
        relation: req.body.emergencyContact.relation,
      },
      caregiverNotification: req.body.caregiverNotification || false,
    };

    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      updatedData,
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Send response to the client
    res.status(200).json({
      message: "Patient updated successfully!",
      patient: updatedPatient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating patient",
      error: error.message,
    });
  }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching patients",
      error: error.message,
    });
  }
};

// Get a single patient by ID
exports.getOnePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching patient",
      error: error.message,
    });
  }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const deletedPatient = await Patient.findByIdAndDelete(patientId);

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      message: "Patient deleted successfully!",
      patient: deletedPatient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting patient",
      error: error.message,
    });
  }
};
