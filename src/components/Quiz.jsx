import { useState, useEffect } from "react";
import ToggleSwitch from "./ToggleSwitch";
import QuizQuestion from "../components/QuizQuestion";
import QuizResult from "../components/QuizResult";
import quizData from "../data.json";
import iconMoonDark from "/assets/Images/icon-moon-dark.svg";
import iconMoonLight from "/assets/Images/icon-moon-light.svg";
import iconSunDark from "/assets/Images/icon-sun-dark.svg";
import iconSunLight from "/assets/Images/icon-sun-light.svg";
import backgroundDesktopDark from "/assets/Images/pattern-background-desktop-dark.svg";
import backgroundDesktopLight from "/assets/Images/pattern-background-desktop-light.svg";
import backgroundMobileDark from "/assets/Images/pattern-background-mobile-dark.svg";
import backgroundMobileLight from "/assets/Images/pattern-background-mobile-light.svg";
import backgroundTabletDark from "/assets/Images/pattern-background-tablet-dark.svg";
import backgroundTabletLight from "/assets/Images/pattern-background-tablet-light.svg";

// Main Quiz component that handles the logic and state of the quiz
function Quiz() {
  const subjects = quizData.quizzes;

  // Icons corresponding to each quiz subject
  const subjectIcons = [
    { name: "HTML", icon: "/assets/Images/icon-html.svg" },
    { name: "CSS", icon: "/assets/Images/icon-css.svg" },
    { name: "JavaScript", icon: "/assets/Images/icon-js.svg" },
    { name: "Accessibility", icon: "/assets/Images/icon-accessibility.svg" },
  ];

  // State declarations
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Determine if the current question is the last in the subject's quiz
  const isLastQuestion =
    currentSubject &&
    currentQuestionIndex === currentSubject.questions.length - 1;

  // Function to calculate the background image based on the screen width
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

  // Effect hook for setting up and updating the background image based on screen size or mode change
  useEffect(() => {
    setBackgroundImage(getBackgroundImage());

    const handleResize = () => {
      setBackgroundImage(getBackgroundImage());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isDarkMode, currentSubject]);

  // Function to toggle between dark and light modes
  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Function to handle the selection of a quiz subject
  const handleSubjectClick = (subject) => {
    setCurrentSubject(subject);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizCompleted(false);
  };

  // Function to handle the submission of an answer
  const handleAnswerSubmission = (selectedOption, isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  // Function to move to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentSubject.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  // Function to reset the quiz for a new attempt
  const handlePlayAgain = () => {
    setIsQuizCompleted(false);
    setCurrentSubject(null);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <div
      className={`viewport-wrapper ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
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

      {!isQuizCompleted ? (
        <div id="quizContainer" className="quiz-container">
          <img
            src={backgroundImage}
            alt="Background"
            className="background-image background-top-left"
          />
          {!currentSubject ? (
            <>
              <div className="text-container">
                <h2 className="header-normal">Welcome to the</h2>
                <h2 className="header-bold">Frontend Quiz!</h2>
                <p className="small-text">Pick a subject to get started.</p>
              </div>

              <div className="button-container">
                {subjects.map((subject, index) => {
                  const subjectIcon = subjectIcons.find(
                    (icon) => icon.name === subject.title
                  );
                  return (
                    <button
                      key={index}
                      onClick={() => handleSubjectClick(subject)}
                      className="subject-button"
                      data-subject={subject.title}
                    >
                      <img
                        src={subjectIcon?.icon}
                        alt={subject.title}
                        className="subject-icon"
                      />
                      {subject.title}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <QuizQuestion
              question={{
                title: currentSubject.title,
                icon:
                  subjectIcons.find(
                    (icon) => icon.name === currentSubject.title
                  )?.icon || "",
                number: currentQuestionIndex + 1,
                totalQuestions: currentSubject.questions.length,
                question:
                  currentSubject.questions[currentQuestionIndex].question,
                options: currentSubject.questions[currentQuestionIndex].options,
                answer: currentSubject.questions[currentQuestionIndex].answer,
              }}
              onSubmitAnswer={handleAnswerSubmission}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={
                currentQuestionIndex === currentSubject.questions.length - 1
              }
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      ) : (
        <QuizResult
          score={score}
          totalQuestions={currentSubject.questions.length}
          onPlayAgain={handlePlayAgain}
          subject={currentSubject?.title}
          isDarkMode={isDarkMode}
          toggleMode={toggleMode}
          backgroundImage={backgroundImage}
        />
      )}
    </div>
  );
}

export default Quiz;
