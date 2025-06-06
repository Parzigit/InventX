"use client"
import { useState } from "react"
import "./Sidebar.scss"
import logo from "../../assets/log.png"
import menu from "../../data/sidebar"
import SidebarItem from "./SidebarItem"

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div
            className="logo"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: isOpen ? "10px 0" : "10px 0",
            }}
          >
            <img
              src={logo || "/placeholder.svg"}
              alt="logo"
              style={{
                cursor: "pointer",
                width: "35px",
                height: "35px",
                objectFit: "contain",
              }}
              onClick={toggle}
            />
          </div>
        </div>
        <div className="menu-items">
          {menu.map((item, index) => {
            return <SidebarItem key={index} item={item} isOpen={isOpen} />
          })}
        </div>
      </div>

      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .3s",
          width: "100%",
        }}
      >
        {children}
      </main>
    </div>
  )
}

export default Sidebar
