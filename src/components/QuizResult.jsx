import React from "react";
import { useEffect } from "react";
import "../layouts/QuizResult.css";
import ToggleSwitch from "./ToggleSwitch";
import iconMoonDark from "/assets/Images/icon-moon-dark.svg";
import iconMoonLight from "/assets/Images/icon-moon-light.svg";
import iconSunDark from "/assets/Images/icon-sun-dark.svg";
import iconSunLight from "/assets/Images/icon-sun-light.svg";

function QuizResult({
  score,
  totalQuestions,
  onPlayAgain,
  subject,
  isDarkMode,
  toggleMode,
  backgroundImage,
}) {
  console.log("Score received in QuizResult:", score);
  console.log("Total questions received in QuizResult:", totalQuestions);

  //State to store the subject icons
  const subjectIcons = {
    HTML: "/assets/Images/icon-html.svg",
    CSS: "/assets/Images/icon-css.svg",
    JavaScript: "/assets/Images/icon-js.svg",
    Accessibility: "/assets/Images/icon-accessibility.svg",
  };

  // Function to handle speech synthesis
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };``

  // Use effect to trigger speech when component mounts
  useEffect(() => {
    const resultText = `Quiz completed. You scored ${score} out of ${totalQuestions} in ${subject}.`;
    speak(resultText);

    // Cleanup function to cancel any ongoing speech when component unmounts
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [score, totalQuestions, subject]);

  return (
    <div
      className={`quiz-result-container ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <img
        src={backgroundImage}
        alt="Background"
        className="background-image background-top-left"
      />

      <div className="mode-icons">
        <img
          src={isDarkMode ? iconMoonLight : iconMoonDark}
          alt="Moon Icon"
          className="mode-icon"
        />
        <ToggleSwitch isOn={isDarkMode} onToggle={toggleMode} />
        <img
          src={isDarkMode ? iconSunLight : iconSunDark}
          alt="Sun Icon"
          className="mode-icon"
        />
      </div>
      <div className="quiz-result-wrapper">
        <div className="quiz-header">
          <div className={`quiz-title-container icon-${subject.toLowerCase()}`}>
            <img
              src={subjectIcons[subject]}
              alt={subject}
              className="quiz-icon"
            />
            <h3 className="quiz-title">{subject}</h3>
          </div>
        </div>

        <div className="quiz-result-content">
          <div className="quiz-result-left-column">
            <h2 className="quiz-result-text">Quiz completed</h2>
            <h1 className="quiz-result-score-text">You scored...</h1>
          </div>
          <div className="quiz-result-right-column">
            <div
              className={`quiz-result-card ${
                isDarkMode ? "dark-mode" : "light-mode"
              }`}
            >
              <div className="quiz-result-header">
                <div
                  className={`quiz-result-icon-wrapper icon-${subject.toLowerCase()}`}
                >
                  <img
                    src={subjectIcons[subject]}
                    alt={subject}
                    className="quiz-result-icon"
                  />
                </div>
                <h2 className="quiz-result-title">{subject}</h2>
              </div>
              <h1 className="quiz-result-score">{score}</h1>
              <p className="quiz-result-details">out of {totalQuestions}</p>
            </div>
            <button
              className="quiz-result-play-again-button"
              onClick={onPlayAgain}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizResult;
