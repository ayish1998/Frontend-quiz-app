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
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  //Variables to keep track of the scores
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

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
    console.log("toggleMode called");
    setIsDarkMode((prevMode) => !prevMode);
  };

  //Function to handle the subject click
  const handleSubjectClick = (subject) => {
    setCurrentSubject(subject);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTotalQuestions(0);
    setIsQuizCompleted(false);
  };

  // Function to move to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentSubject.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Quiz completed, display the result
      console.log("Final score:", score);
      console.log("Total questions:", totalQuestions);
      setIsQuizCompleted(true);
    }
  };

  //Function to handle the answer submission
  const handleAnswerSubmission = (selectedOption, isCorrect) => {
    const currentQuestion = currentSubject.questions[currentQuestionIndex];

    console.log("Selected option:", selectedOption);
    console.log("Correct answer:", currentQuestion.answer);
    console.log("Is correct:", isCorrect);

    if (isCorrect) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        console.log("New score:", newScore);
        return newScore;
      });
    }

    if (currentQuestionIndex === currentSubject.questions.length - 1) {
      setIsQuizCompleted(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  //Function to handle play again feature
  const handlePlayAgain = () => {
    setIsQuizCompleted(false);
    setCurrentSubject(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTotalQuestions(0);
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
          ) : currentSubject &&
            currentSubject.questions &&
            currentQuestionIndex < currentSubject.questions.length ? (
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
              isLastQuestion={
                currentQuestionIndex === currentSubject.questions.length - 1
              }
              isDarkMode={isDarkMode}
            />
          ) : (
            <div>No more questions available.</div>
          )}
        </div>
      ) : (
        <>
          {console.log("Rendering QuizResult with score:", score)}
          {console.log(
            "Rendering QuizResult with total questions:",
            currentSubject.questions.length
          )}
          <QuizResult
            score={score}
            totalQuestions={currentSubject.questions.length}
            onPlayAgain={handlePlayAgain}
            subject={currentSubject?.title}
            isDarkMode={isDarkMode}
            toggleMode={toggleMode}
            backgroundImage={backgroundImage}
          />
        </>
      )}
    </div>
  );
}

export default Quiz;
