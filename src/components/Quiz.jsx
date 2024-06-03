// Code for the Quiz component
import { useState } from 'react';
import iconMoonDark from '/assets/images/icon-moon-dark.svg';
import iconMoonLight from '/assets/images/icon-moon-light.svg';
import iconSunDark from '/assets/images/icon-sun-dark.svg';
import iconSunLight from '/assets/images/icon-sun-light.svg';
import backgroundDesktopDark from '/assets/images/pattern-background-desktop-dark.svg';
import backgroundDesktopLight from '/assets/images/pattern-background-desktop-light.svg';
import backgroundMobileDark from '/assets/images/pattern-background-mobile-dark.svg';
import backgroundMobileLight from '/assets/images/pattern-background-mobile-light.svg';
import backgroundTabletDark from '/assets/images/pattern-background-tablet-dark.svg';
import backgroundTabletLight from '/assets/images/pattern-background-tablet-light.svg';

function Quiz() {
  // State for toggling dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);

   //Logic for toggling dark mode
   const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  console.log("Rendering Quiz component"); 
  const subjects = [
    { name: 'HTML', icon: '/assets/images/icon-html.svg' },
    { name: 'CSS', icon: '/assets/images/icon-css.svg' },
    { name: 'JavaScript', icon: '/assets/images/icon-js.svg' },
    { name: 'Accessibility', icon: '/assets/images/icon-accessibility.svg' },
  ];

  const handleSubjectClick = (subject) => {
    console.log(`Starting quiz for subject: ${subject.name}`);
    // Add logic to start the selected quiz
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
        <img
          src={isDarkMode ? iconMoonLight : iconSunDark}
          alt={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          className="mode-icon"
          onClick={toggleMode}
        />
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
            <button key={index} onClick={() => handleSubjectClick(subject)}>
              <img src={subject.icon} alt={subject.name} style={{ marginRight: '10px' }} />
              {subject.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
