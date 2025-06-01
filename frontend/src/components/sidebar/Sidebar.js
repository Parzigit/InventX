"use client"
import { useState } from "react"
import "./Sidebar.scss"
import { HiMenuAlt3 } from "react-icons/hi"
import logo from "../../assets/log.png"
import menu from "../../data/sidebar"
import SidebarItem from "./SidebarItem"
import { useNavigate } from "react-router-dom"

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)
  // const navigate = useNavigate()

  // const goHome = () => {
  //   navigate("/")
  // }

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "70px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "inline" }&&{marginLeft:isOpen?"60px":"-5px"}}>
          {/* <HiMenuAlt3 onClick=/> */}
          <img src={logo || "/placeholder.svg"} alt="logo" 
              paddingtop={1}
              size={35}
              style={{ cursor: "pointer" }}
              onClick={toggle} 
            />
          </div>
          {/* 
          <div
            className="bars"
            style={{ marginLeft: isOpen ? "120px" : "120px" }}
          >
            
          </div> */}
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          paddingLeft: isOpen ? "650px" : "250px",
          transition: "all .8s",
        }}
      >
        {children}
      </main>
    </div>
  )
}

export default Sidebar


