import React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import I1 from "../images/bg1.jpeg";
import MenuItem from '@mui/material/MenuItem';

const Signup = () => {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [staff_no, setStaffNo] = useState('');
    const [email, setEmail] = useState('');
    const [Hash_password, setHashPassword] = useState('');
    const [tel_no, setTelNo] = useState('');
    const [ProfilePicture, setPicture] = useState(null);
    const [gender, setGender] = useState('');
    const navigate = useNavigate();

    const sendData = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const telRegex = /^[0-9]{10}$/;  // Validating telephone number for 10 digits

        if (!name) {
            return toast.error("Please provide your name.");
        }
        if (!birthday) {
            return toast.error("Please provide a birthday.");
        }
        if (!staff_no) {
            return toast.error("Please provide a staff ID.");
        }
        // if (!email || !emailRegex.test(email)) {
        //     return toast.error("Please provide a valid email.");
        // }
        if (!email) {
            return toast.error("Please provide an email.");
        } else if (!emailRegex.test(email)) {
            return toast.error("Please provide a valid email.");
        }

        if (!tel_no || !telRegex.test(tel_no)) {
            return toast.error("Please provide a valid 10-digit telephone number.");
        }
        if (!Hash_password || Hash_password.length < 8) {
            return toast.error("Password should be at least 8 characters long.");
        }
        if (!gender) {
            return toast.error("Please select your gender.");
        }

        // If all validation passes
        const formData = new FormData();
        formData.append('name', name);
        formData.append('birthday', birthday);
        formData.append('staff_no', staff_no);
        formData.append('email', email);
        formData.append('Hash_password', Hash_password);
        formData.append('tel_no', tel_no);
        formData.append('gender', gender);

        // Append ProfilePicture only if it's provided
        if (ProfilePicture) {
            formData.append('ProfilePicture', ProfilePicture);
        }

        axios.post("http://localhost:8040/user/Signup", formData)
            .then(() => {
                toast.success("Successfully Registered!");

                // Clear form fields
                setName('');
                setBirthday('');
                setStaffNo('');
                setEmail('');
                setHashPassword('');
                setTelNo('');
                setGender('');
                setPicture(null);

                navigate('/login');

            })
            .catch(() => {
                toast.error("Something went wrong.");
            });

    };

    const handleCatImg = (e) => {
        setPicture(e.target.files[0]);
    };

    return (
        <div style={{
            backgroundImage: `url(${I1})`,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(90%)",
            height: "100vh",
            paddingTop: "40px"
        }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={sendData} encType='multipart/form-data' noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id="name"
                                    label="Name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id="birthday"
                                    label="Birthday"
                                    name="birthday"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id="staff_no"
                                    label="Staff ID"
                                    name="staff_no"
                                    value={staff_no}
                                    onChange={(e) => setStaffNo(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id="email"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id="tel_no"
                                    label="Telephone Number"
                                    name="tel_no"
                                    type="tel"
                                    value={tel_no}
                                    onChange={(e) => setTelNo(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id="Hash_password"
                                    label="Password"
                                    name="Hash_password"
                                    type="password"
                                    value={Hash_password}
                                    onChange={(e) => setHashPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id="gender"
                                    label="Gender"
                                    name="gender"
                                    select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="ProfilePicture"
                                    label="Profile Picture"
                                    name="ProfilePicture"
                                    type="file"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleCatImg}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Signup;
