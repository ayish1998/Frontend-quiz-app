// Code for the Quiz component
import { useState, useEffect } from "react";
import iconMoonDark from "/assets/Images/icon-moon-dark.svg";
import iconMoonLight from "/assets/Images/icon-moon-light.svg";
import iconSunDark from "/assets/Images/icon-sun-dark.svg";
import iconSunLight from "/assets/Images/icon-sun-light.svg";
import ToggleSwitch from "./ToggleSwitch";
import QuizQuestion from "../components/QuizQuestion";
import quizData from "../data.json";
import backgroundDesktopDark from "/assets/Images/pattern-background-desktop-dark.svg";
import backgroundDesktopLight from "/assets/Images/pattern-background-desktop-light.svg";
import backgroundMobileDark from "/assets/Images/pattern-background-mobile-dark.svg";
import backgroundMobileLight from "/assets/Images/pattern-background-mobile-light.svg";
import backgroundTabletDark from "/assets/Images/pattern-background-tablet-dark.svg";
import backgroundTabletLight from "/assets/Images/pattern-background-tablet-light.svg";

function Quiz() {
  // Using the quizzes array from quizData in the data.json file
  const subjects = quizData.quizzes;

  // Subject icons
  const subjectIcons = [
    { name: "HTML", icon: "/assets/Images/icon-html.svg" },
    { name: "CSS", icon: "/assets/Images/icon-css.svg" },
    { name: "JavaScript", icon: "/assets/Images/icon-js.svg" },
    { name: "Accessibility", icon: "/assets/Images/icon-accessibility.svg" },
  ];

  //Variable to keep track of the current mode
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState("");

  //Variable keep track of the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSubject, setCurrentSubject] = useState(null);

  // Check if the current question is the last question in the quiz
  const isLastQuestion =
    currentSubject &&
    currentQuestionIndex === currentSubject.questions.length - 1;

  //Function to get the background image based on the screen width
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

  useEffect(() => {
    setBackgroundImage(getBackgroundImage());

    const handleResize = () => {
      setBackgroundImage(getBackgroundImage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  //Function to handle the subject click
  const handleSubjectClick = (subject) => {
    setCurrentSubject(subject);
    setCurrentQuestionIndex(0);
  };

  //Function to handle the answer submission
  const handleAnswerSubmission = (selectedOption) => {
    // Check if the selected option is correct
    const currentQuestion = currentSubject.questions[currentQuestionIndex];
    const isCorrect = currentQuestion.options.find(
      (option) => option.text === selectedOption.text
    ).isCorrect;

    // Handle the correct/incorrect answer logic here
    console.log(
      `Selected option: ${selectedOption.text}, Correct: ${isCorrect}`
    );
  };

  // Function to move to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentSubject.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle the quiz completion logic here
      console.log("Quiz completed!");
    }
  };

  //Render the quiz container
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
        ) : currentSubject.questions && currentSubject.questions.length > 0 ? (
          currentSubject.questions[currentQuestionIndex] ? (
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
              }}
              onSubmitAnswer={handleAnswerSubmission}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={isLastQuestion}
              isDarkMode={isDarkMode}
            />
          ) : (
            <div>Invalid question data.</div>
          )
        ) : (
          <div>No questions available for this subject.</div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
