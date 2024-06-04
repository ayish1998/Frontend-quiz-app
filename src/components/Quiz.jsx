// Code for the Quiz component
import { useState } from 'react';
import iconMoonDark from '/assets/Images/icon-moon-dark.svg';
import iconMoonLight from '/assets/Images/icon-moon-light.svg';
import iconSunDark from '/assets/Images/icon-sun-dark.svg';
import iconSunLight from '/assets/Images/icon-sun-light.svg';
import ToggleSwitch from './ToggleSwitch';
import backgroundDesktopDark from '/assets/Images/pattern-background-desktop-dark.svg';
import backgroundDesktopLight from '/assets/Images/pattern-background-desktop-light.svg';
import backgroundMobileDark from '/assets/Images/pattern-background-mobile-dark.svg';
import backgroundMobileLight from '/assets/Images/pattern-background-mobile-light.svg';
import backgroundTabletDark from '/assets/Images/pattern-background-tablet-dark.svg';
import backgroundTabletLight from '/assets/Images/pattern-background-tablet-light.svg';

function Quiz() {
  // State for toggling dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  //Logic for toggling dark mode
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  console.log("Rendering Quiz component"); 
  const subjects = [
    { name: 'HTML', icon: '/assets/Images/icon-html.svg' },
    { name: 'CSS', icon: '/assets/Images/icon-css.svg' },
    { name: 'JavaScript', icon: '/assets/Images/icon-js.svg' },
    { name: 'Accessibility', icon: '/assets/Images/icon-accessibility.svg' },
  ];

  const handleSubjectClick = (subject) => {
    console.log(`Starting quiz for subject: ${subject.name}`);
    // Add logic to start the selected quiz later
  };

  // Function to get the background image based on the screen width and dark mode
  const getBackgroundImage = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 375) {
      return isDarkMode ? backgroundMobileDark : backgroundMobileLight;
    } else if (screenWidth <= 768) {
      return isDarkMode ? backgroundTabletDark : backgroundTabletLight;
    } else {
      return isDarkMode ? backgroundDesktopDark : backgroundDesktopLight;
    }
  };

  // Return the JSX for the Quiz component
  return (
    <div className={`viewport-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="mode-icons">
      <img src={isDarkMode ? iconMoonLight : iconMoonDark} alt="Moon Icon" className="mode-icon" />
        <ToggleSwitch isOn={isDarkMode} onToggle={toggleMode} />
        <img src={isDarkMode ? iconSunLight : iconSunDark} alt="Sun Icon" className="mode-icon" />
      </div>

      <div id="quizContainer" className="quiz-container">
        {/* Background images */}
        <img src={getBackgroundImage()} alt="Background" className="background-image" />
        <div className="background-image background-top-left"></div>
        <div className="background-image background-bottom-right"></div>

        <div className="text-container">
          <h2 className="header-normal">Welcome to the</h2>
          <h2 className="header-bold">Frontend Quiz!</h2>
          <p className="small-text">Pick a subject to get started.</p>
        </div>

        <div className="button-container">
          {subjects.map((subject, index) => (
            <button key={index} onClick={() => handleSubjectClick(subject)} className="subject-button" data-subject={subject.name}>
            <img src={subject.icon} alt={subject.name} className="subject-icon" />
            {subject.name}
          </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;