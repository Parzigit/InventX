"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { SpinnerImg } from "../../components/loader/Loader"
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser"
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice"
import { getUser } from "../../services/authService"
import "./Profile.scss"

const Profile = () => {
  useRedirectLoggedOutUser("/login")
  const dispatch = useDispatch()

  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log("Getting user")
    setIsLoading(true)
    async function getUserData() {
      const data = await getUser()
      console.log(data)
  
      if (data) {
        setProfile(data)
        await dispatch(SET_USER(data))
        await dispatch(SET_NAME(data.name))
      } else {
        setProfile(null)
      }
      setIsLoading(false)
    }
    getUserData()
  }, [dispatch])
  
  return (
    <div className="profile-page">
      {/* Page Header
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">👤</span>
            User Profile
          </h1>
          <p className="page-subtitle">Manage your account information and preferences</p>
        </div>
      </div> */}
      <br>
      </br>
      <br>
      </br>
      {/* Profile Content */}
      <div className="profile-content">
        {isLoading && (
          <div className="loading-container">
            <SpinnerImg />
            <p className="loading-text">Loading profile...</p>
          </div>
        )}

        {!isLoading && profile === null ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>Something went wrong</h3>
            <p>Unable to load profile data. Please reload the page or try again later.</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Reload Page
            </button>
          </div>
        ) : (
          !isLoading && (
            <div className="profile-card">
              {/* Profile Header */}
              <div className="profile-header">
                <div className="profile-avatar">
                  <img src={profile?.photo || "/placeholder.svg"} alt="Profile" className="avatar-image" />
                  <div className="avatar-badge">
                    <span>✓</span>
                  </div>
                </div>
                <div className="profile-info">
                  <h2 className="profile-name">{profile?.name || "User Name"}</h2>
                  <p className="profile-email">{profile?.email || "user@example.com"}</p>
                  {/* <div className="profile-status">
                    <span className="status-badge status-active">Active</span>
                  </div> */}
                </div>
                <div className="profile-actions">
                  <Link to="/edit-profile">
                    <button className="btn btn-primary">
                      {/* <span className="btn-icon">✏️</span> */}
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>

              {/* Profile Details */}
              <div className="profile-details">
                <h3 className="details-title">Profile Information</h3>
                <div className="details-grid">
                  <ProfileField  label="Full Name" value={profile?.name || "Not provided"} />
                  <ProfileField label="Email Address" value={profile?.email || "Not provided"} />
                  <ProfileField label="Phone Number" value={profile?.phone || "Not provided"} />
                  <ProfileField label="Bio" value={profile?.bio || "No bio available"} isLarge />
                </div>
              </div>

              {/* Quick Actions */}
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
          )
        )}
      </div>
    </div>
  )
}

// Profile Field Component
const ProfileField = ({ icon, label, value, isLarge = false }) => {
  return (
    <div className={`profile-field ${isLarge ? "profile-field-large" : ""}`}>
      <div className="field-header">
        <span className="field-icon">{icon}</span>
        <label className="field-label">{label}</label>
      </div>
      <div className="field-value">
        {isLarge ? <p className="field-text-large">{value}</p> : <span className="field-text">{value}</span>}
      </div>
    </div>
  )
}

// Action Button Component
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

export default Profile
