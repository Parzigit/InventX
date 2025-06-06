"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
// import "./SidebarItem.scss"

const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false)

  if (item.childrens) {
    return (
      <div className={`sidebar-item s-parent ${expandMenu ? "open" : ""}`}>
        <div className="sidebar-title" onClick={() => setExpandMenu(!expandMenu)}>
          <span>
            <div className="icon">{item.icon}</div>
            {isOpen && <span className="title-text">{item.title}</span>}
          </span>
          {isOpen && (
            <div className={`arrow-icon ${expandMenu ? "expanded" : ""}`}>
              <span>▶</span>
            </div>
          )}
        </div>
        {expandMenu && (
          <div className="sidebar-content">
            {item.childrens.map((child, index) => (
              <div key={index} className="sidebar-item s-child">
                <NavLink to={child.path} className={({ isActive }) => (isActive ? "active" : "")}>
                  <div className="sidebar-title">
                    <span>
                      <div className="icon">{child.icon}</div>
                      {isOpen && <span className="title-text">{child.title}</span>}
                    </span>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        )}
        {!isOpen && (
          <div className="sidebar-tooltip">
            <div className="tooltip-content">
              {/* <div className="tooltip-title">{item.title}</div> */}
              <div className="tooltip-children">
                {item.childrens.map((child, index) => (
                  <NavLink
                    key={index}
                    to={child.path}
                    className={({ isActive }) => `tooltip-child ${isActive ? "active" : ""}`}
                  >
                    {/* <div className="child-icon">{child.icon}</div> */}
                    {/* <span>{child.title}</span> */}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div className="sidebar-item">
        <NavLink to={item.path} className={({ isActive }) => (isActive ? "active" : "")}>
          <div className="sidebar-title">
            <span>
              <div className="icon">{item.icon}</div>
              {isOpen && <span className="title-text">{item.title}</span>}
            </span>
          </div>
        </NavLink>
        {!isOpen && (
          <div className="sidebar-tooltip">
            <div className="tooltip-content">
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default SidebarItem
