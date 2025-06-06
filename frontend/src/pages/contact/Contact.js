"use client"

import { useState } from "react"
import { FaPhoneAlt, FaEnvelope, FaInstagram } from "react-icons/fa"
import { GoLocation } from "react-icons/go"
import { toast } from "react-toastify"
import axios from "axios"
import { BACKEND_URL } from "../../services/authService"
import "./Contact.scss"

const Contact = () => {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const data = {
    subject,
    message,
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contactus`, data)
      setSubject("")
      setMessage("")
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      {/* Page Header */}
      <br>
      </br><br>
      </br><br>
      </br>
      {/* <div className="page-header">
        <div className="header-content">
          <div className="header-main">
            <h1 className="page-title">
              <span className="title-icon">📞</span>
              Contact Us
            </h1>
            <p className="page-subtitle">Get in touch with our support team</p>
          </div>
        </div>
      </div> */}

      {/* Contact Content */}
      <div className="contact-content">
        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-container">
            <div className="form-card">
              <h3 className="form-title">Send Us a Message</h3>
              <p className="form-subtitle">Fill out the form below and we'll get back to you as soon as possible.</p>

              <form onSubmit={sendEmail}>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows="6"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info-container">
            <div className="info-card">
              <h3 className="info-title">Our Contact Information</h3>
              <p className="info-subtitle">Feel free to reach out through any of these channels</p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaPhoneAlt />
                  </div>
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <p>+91 8XX124</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>Support@inventx.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <GoLocation />
                  </div>
                  <div className="contact-text">
                    <h4>Address</h4>
                    <p>Atreya, Jabalpur</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FaInstagram />
                  </div>
                  <div className="contact-text">
                    <h4>Instagram</h4>
                    <p>@sumedh.atreya</p>
                  </div>
                </div>
              </div>

              <div className="business-hours">
                <h4>Business Hours</h4>
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
