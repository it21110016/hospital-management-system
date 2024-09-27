import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header2 from './Header2';


export default function Main() {




  return (

    <div style={{ backgroundSize: "container", backgroundColor: "#e9f4f8" }}> <br></br>
      <Header2 />

      <section id="doctors" class="doctors">
        <center>
          <div class="container">
            <br></br><center>
              <div class="section-title">
                <h2><br></br>Our Specialists<br></br> </h2>
              </div>

              <div class="row">
                <br></br>
                <div class="col-lg-6"><br></br><br></br>
                  <div class="member d-flex align-items-start">
                    <div class="pic"><img src="https://kevsbest.com/wp-content/uploads/2019/07/Dr.-George-Atia-282x300.jpg" class="img-fluid" alt="" /></div>
                    <div class="member-info">
                      <h4>Walter White</h4>
                      <span>Chief Medical Officer</span>
                      <p>family physician or primary care physician, a GP provides comprehensive medical care for patients of all ages and manages a wide range of health conditions.</p>
                      <div class="social">
                        <a href=""><i class="ri-twitter-fill"></i></a>
                        <a href=""><i class="ri-facebook-fill"></i></a>
                        <a href=""><i class="ri-instagram-fill"></i></a>
                        <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 mt-4 mt-lg-0"><br></br><br></br>
                  <div class="member d-flex align-items-start">
                    <div class="pic"><img src="https://th.bing.com/th/id/OIP.RxhQ2nMqf7hwsx884qzCpAHaE8?pid=ImgDet&rs=1" class="img-fluid" alt="" /></div>
                    <div class="member-info">
                      <h4>Sarah Jhonson</h4>
                      <span>Anesthesiologist</span>
                      <p>A specialist is a doctor who has advanced training in a specific area of medicine, such as cardiology, dermatology, oncology, or pediatrics. They provide specialized care for patients with specific health conditions</p>
                      <div class="social">
                        <a href=""><i class="ri-twitter-fill"></i></a>
                        <a href=""><i class="ri-facebook-fill"></i></a>
                        <a href=""><i class="ri-instagram-fill"></i></a>
                        <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 mt-4 mt-lg-0"><br></br><br></br>
                  <div class="member d-flex align-items-start">
                    <div class="pic"><img src="https://th.bing.com/th/id/OIP.RxhQ2nMqf7hwsx884qzCpAHaE8?pid=ImgDet&rs=1" class="img-fluid" alt="" /></div>
                    <div class="member-info">
                      <h4>Sarah Jhonson</h4>
                      <span>Anesthesiologist</span>
                      <p>A specialist is a doctor who has advanced training in a specific area of medicine, such as cardiology, dermatology, oncology, or pediatrics. They provide specialized care for patients with specific health conditions</p>
                      <div class="social">
                        <a href=""><i class="ri-twitter-fill"></i></a>
                        <a href=""><i class="ri-facebook-fill"></i></a>
                        <a href=""><i class="ri-instagram-fill"></i></a>
                        <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 mt-4">
                  <div class="member d-flex align-items-start">
                    <div class="pic"><img src="https://th.bing.com/th/id/OIP.RxhQ2nMqf7hwsx884qzCpAHaE8?pid=ImgDet&rs=1" class="img-fluid" alt="" /></div>
                    <div class="member-info">
                      <h4>William Anderson</h4>
                      <span>Cardiology</span>
                      <p>Surgeons are doctors who specialize in performing surgical procedures to treat various diseases, injuries, or conditions. They may specialize in areas such as orthopedics, neurosurgery, or cardiothoracic surgery.</p>
                      <div class="social">
                        <a href=""><i class="ri-twitter-fill"></i></a>
                        <a href=""><i class="ri-facebook-fill"></i></a>
                        <a href=""><i class="ri-instagram-fill"></i></a>
                        <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 mt-4">
                  <div class="member d-flex align-items-start">
                    <div class="pic"><img src="https://dentist-telaviv.com/wp-content/uploads/2021/03/tmm490d2kv-1-1.jpg" class="img-fluid" alt="" /></div>
                    <div class="member-info">
                      <h4>Amanda Jepson</h4>
                      <span>Neurosurgeon</span>
                      <p>Pediatricians specialize in providing medical care to infants, children, and adolescents. They manage childhood illnesses, provide vaccinations, and monitor growth and development.</p>
                      <div class="social">
                        <a href=""><i class="ri-twitter-fill"></i></a>
                        <a href=""><i class="ri-facebook-fill"></i></a>
                        <a href=""><i class="ri-instagram-fill"></i></a>
                        <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </center>
          </div>
        </center>
      </section>

      <section id="gallery" class="gallery">
        <center>
          <div class="container">

            <div class="section-title">
              <h2><br></br>Gallery</h2>
              <p><br></br>It’s all about us at TJM
                We invite you to take a moment to witness what we do as a respected corporate citizen in the areas of education, service, celebrations, sustainability, nurturing people’s talents, what others say about us and many more</p>
            </div>
          </div>

          <div class="container-fluid">
            <div class="row g-0">

              <div class="col-lg-3 col-md-4">
                <div class="gallery-item">
                  <a href="assets/img/gallery/gallery-1.jpg" class="galelry-lightbox">
                    <img src="https://th.bing.com/th/id/R.76a8252e44414e5356d6c7771fac7636?rik=%2bzau8m3aylXDgg&riu=http%3a%2f%2finteractives.dallasnews.com%2f2015%2fnew-parkland%2fimages%2fer-bed_1200.jpg&ehk=2ZLqpE0rsf9QXFdJ%2f4ajziZ3m3y2IIpmqhS1irsa3lg%3d&risl=&pid=ImgRaw&r=0" alt="" class="img-fluid" />
                  </a>
                </div>
              </div>

              <div class="col-lg-3 col-md-4">
                <div class="gallery-item">
                  <a href="assets/img/gallery/gallery-2.jpg" class="galelry-lightbox">
                    <img src="https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" class="img-fluid" />
                  </a>
                </div>
              </div>

              <div class="col-lg-3 col-md-4">
                <div class="gallery-item">
                  <a href="assets/img/gallery/gallery-3.jpg" class="galelry-lightbox">
                    <img src="https://th.bing.com/th/id/OIP.NCXCZpB-edi7DW5ygE_PywHaE8?pid=ImgDet&rs=1" alt="" class="img-fluid" />
                  </a>
                </div>
              </div>

              <div class="col-lg-3 col-md-4">
                <div class="gallery-item">
                  <a href="assets/img/gallery/gallery-4.jpg" class="galelry-lightbox">
                    <img src="https://th.bing.com/th/id/OIP.D2kS5oKnXDSQg8oezBzaAgHaE7?pid=ImgDet&rs=1" alt="" class="img-fluid" />
                  </a>
                </div>
              </div>

              <div class="col-lg-3 col-md-4">
                <div class="gallery-item">
                  <a href="assets/img/gallery/gallery-5.jpg" class="galelry-lightbox">
                    <img src="https://th.bing.com/th/id/OIP.NCXCZpB-edi7DW5ygE_PywHaE8?pid=ImgDet&rs=1" alt="" class="img-fluid" />
                  </a>
                </div>
              </div>

              <div class="col-lg-3 col-md-4">
                <div class="gallery-item">
                  <a href="assets/img/gallery/gallery-6.jpg" class="galelry-lightbox">
                    <img src="https://th.bing.com/th/id/OIP.D2kS5oKnXDSQg8oezBzaAgHaE7?pid=ImgDet&rs=1" alt="" class="img-fluid" />
                  </a>
                </div>
              </div>

              <div class="col-lg-3 col-md-4">
                <div class="gallery-item">
                  <a href="assets/img/gallery/gallery-7.jpg" class="galelry-lightbox">
                    <img src='https://lh6.googleusercontent.com/proxy/xwdyIZ-zHGjHXoD5BZ_xDcelwFxH8D93PcAGOjDUFdGDPX6DGj4SB_lXt9MTjhUPBsHjks40B7A26ZrPmfha2k9I96PJvfJGcPB1h7VspDr64BbZ28HtKPmPMJlUfOm-Kg=s0-d' alt="" class="img-fluid" />
                  </a>
                </div>
              </div>

              <div class="col-lg-3 col-md-4">
                <div class="gallery-item">
                  <a href="assets/img/gallery/gallery-8.jpg" class="galelry-lightbox">
                    <img src="https://i.pinimg.com/originals/4f/88/1a/4f881a110739c4ffd8bb92ddb8fd4204.jpg" alt="" class="img-fluid" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </center>
      </section>
    </div>
  );
}

