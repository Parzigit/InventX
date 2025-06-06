"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "../../components/loader/Loader"
import { selectUser } from "../../redux/features/auth/authSlice"
import "./Profile.scss"
import { toast } from "react-toastify"
import { updateUser } from "../../services/authService"
import ChangePassword from "../../components/changePassword/ChangePassword"
import { Link } from "react-router-dom"
const EditProfile = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector(selectUser)
  const { email } = user

  useEffect(() => {
    if (!email) {
      navigate("/profile")
    }
  }, [email, navigate])

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  }
  const [profile, setProfile] = useState(initialState)
  const [profileImage, setProfileImage] = useState("")
  const [imagePreview, setImagePreview] = useState(user?.photo)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setProfileImage(file)

    // Create preview
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      let imageURL = profile.photo

      if (
        profileImage &&
        (profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" || profileImage.type === "image/png")
      ) {
        const image = new FormData()
        image.append("file", profileImage)
        image.append("cloud_name", "zinotrust")
        image.append("upload_preset", "wk66xdkq")

        const response = await fetch("https://api.cloudinary.com/v1_1/zinotrust/image/upload", {
          method: "post",
          body: image,
        })
        const imgData = await response.json()
        imageURL = imgData.url.toString()
      }

      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: imageURL,
      }

      const data = await updateUser(formData)
      console.log(data)
      toast.success("Profile updated successfully!")
      navigate("/profile")
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <div className="edit-profile-page">
      {/* Page Header
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">✏️</span>
            Edit Profile
          </h1>
          <p className="page-subtitle">Update your personal information and preferences</p>
        </div>
      </div> */}

      {/* Edit Profile Content */}
      <div className="edit-profile-content">
        {isLoading && (
          <div className="loading-overlay">
            <Loader />
            <p className="loading-text">Updating profile...</p>
          </div>
        )}

        <div className="edit-profile-card">
          <form onSubmit={saveProfile} className="profile-form">
            {/* Profile Image Section */}
            <div className="image-section">
              <h3 className="section-title">Profile Picture</h3>
              <div className="image-upload">
                <div className="current-image">
                  <img src={imagePreview || "/placeholder.svg"} alt="Profile" className="preview-image" />
                  <div className="image-overlay">
                    <span className="upload-icon">📷</span>
                  </div>
                </div>
                <div className="upload-controls">
                  <label htmlFor="image-upload" className="upload-button">
                    {/* <span className="btn-icon">📁</span> */}
                    Choose New Photo
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="file-input"
                  />
                  <p className="upload-hint">JPG, PNG or JPEG. Max size 5MB.</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="form-grid">
                <FormField
                  label="Full Name"
                  // icon="👤"
                  type="text"
                  name="name"
                  value={profile?.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />

                <FormField
                  label="Email Address"
                  // icon="📧"
                  type="email"
                  name="email"
                  value={profile?.email}
                  disabled
                  note="Email cannot be changed"
                />

                <FormField
                  label="Phone Number"
                  // icon="📱"
                  type="tel"
                  name="phone"
                  value={profile?.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <FormField
                label="Bio"
                // icon="📝"
                type="textarea"
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows={4}
                isLarge
              />
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/profile")}>
                {/* <span className="btn-icon">❌</span> */}
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {/* <span className="btn-icon">💾</span> */}
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        {/* <div className="password-section">
          <ChangePassword />
        </div> */}

         <div className="quick-actions">
                <h3 className="actions-title">Quick Actions</h3>
                <div className="actions-grid">
                <ActionButton
                  title="Change Password"
                  description="Update your account password"
                  link="/change-password"
                />
                  {/* <ActionButton
                    icon="🔔"
                    title="Notifications"
                    description="Manage notification preferences"
                    link="/notifications"
                  /> */}
                  {/* <ActionButton icon="🛡️" title="Security" description="Review security settings" link="/security" /> */}
                  {/* <ActionButton icon="📊" title="Activity Log" description="View account activity" link="/activity" /> */}
                </div>
              </div>
      </div>
    </div>
  )
}

// Form Field Component
const FormField = ({
  label,
  icon,
  type,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  note,
  required,
  rows,
  isLarge,
}) => {
  return (
    <div className={`form-field ${isLarge ? "form-field-large" : ""}`}>
      <label className="field-label">
        <span className="label-icon">{icon}</span>
        {label}
        {required && <span className="required">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          className="form-input form-textarea"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="form-input"
        />
      )}

      {note && <p className="field-note">{note}</p>}
    </div>
  )
}

const ActionButton = ({ icon, title, description, link }) => {
  return (
    <Link to={link} className="action-button">
      <div className="action-icon">
        <span>{icon}</span>
      </div>
      <div className="action-content">
        <h4 className="action-title">{title}</h4>
        <p className="action-description">{description}</p>
      </div>
      <div className="action-arrow">
        <span>→</span>
      </div>
    </Link>
  )
}

export default EditProfile
