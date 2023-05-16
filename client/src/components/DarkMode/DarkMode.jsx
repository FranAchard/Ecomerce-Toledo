import React, { useState, useEffect } from "react";
import "./darkMode.scss";
import moon from "/assets/luna.png";
import sun from "/assets/soleado.png";

const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const body = document.querySelector("body");
        if (isDarkMode) {
            body.classList.add("dark");
        } else {
            body.classList.remove("dark");
        }
    }, [isDarkMode]);

    const handleDarkModeToggle = () => {
        setIsDarkMode((prevMode) => !prevMode);
        setIsActive((prevActive) => !prevActive);
    };

    return (
        <button
            className={`switch ${isDarkMode ? "dark" : ""} ${isActive ? "active" : ""}`}
            id="switch"
            onClick={handleDarkModeToggle}
        >
            <span>
                <img className="icon" src={sun} alt="sun" />
            </span>
            <span>
                <img className="icon" src={moon} alt="moon" />
            </span>
        </button>
    );
};

export default DarkMode;
