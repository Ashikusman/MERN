import React from 'react'
import logo from "../Assets/logo.png"
import { Link } from 'react-router-dom'
import instagram_icon from "../Assets/instagram_icon.png"
import whatsapp_icon from "../Assets/whatsapp_icon.png"
import facebook_icon from "../Assets/facebook_icon.png"

export const Footer = () => {
  return (
    <div className="pt-8 bg-white min-h-[calc(40vh)]">
        <div className="flex items-center gap-3 justify-center h-8 ">
            <img className="h-full" src={logo} alt=""/>
            <h1 className="font-bold text-center text-4xl ">RESTAURANT</h1>
        </div>
        <div className="pt-8 flex gap-10 items-center justify-center font-bold text-xl">           
            <Link to={"/menu"}>Menu</Link>
            <Link>About</Link>
            <Link>Contact</Link>
        </div>
        <div className="pt-8 flex gap-10 items-center justify-center">
            <div>
                <img src={instagram_icon} alt=""/>
            </div>
            <div>
                <img src={whatsapp_icon} alt=""/>
            </div>
            <div className="h-8">
                <img className="h-full"src={facebook_icon} alt=""/>
            </div>
        </div>
        <div className="pt-8">
            <hr/>
            <p className="text-center mt-2 text-xl">Copyright @ 2023 - All Rights Reserved.</p>
        </div>
    </div>
  )
}
