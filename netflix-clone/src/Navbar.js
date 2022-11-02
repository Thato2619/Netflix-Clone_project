import React, { useEffect, useState } from "react";
import "./Navbar.css";

//add scroll listner so that it listens to scroll
function Navbar() {
    const [show, handleShow] = useState(false);
    useEffect(() => {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
        handleShow(true);
    } else handleShow(false);
    });
    //everytime useEffect() used, remove eventlistenrs to avoid many eventlusterns
    return () => {
        window.removeEventListener("scroll");
    };
}, []);

return (
    //this is for when users scroll to 10px then then nav-black will appear
    <div className={`nav ${show && "nav_black"}`}>
        <img
            className="nav_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
            />
        <img
            className="nav_avator"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Netflix Avator"
        />
    </div>
);
}

export default Navbar;