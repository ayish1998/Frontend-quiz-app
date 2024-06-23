import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../layouts/QuizQuestion.css";

function QuizQuestion({
  question,
  onSubmitAnswer,
  onNextQuestion,
  isLastQuestion,
  isDarkMode,
}) {
  // State declarations
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(null);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  // Effect to reset state on question change
  useEffect(() => {
    setSelectedOption(null);
    setShowResult(false);
    setError(null);
    if (isVoiceEnabled) {
      console.log("Attempting to speak question");
      speak(`Question ${question.number}: ${question.question}`);
    }
  }, [question, isVoiceEnabled]);

  const speak = (text) => {
    console.log("Speaking:", text);
    if ("speechSynthesis" in window && isVoiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.log("Speech synthesis not available or voice not enabled");
    }
  };

  // Handles option selection
  const handleOptionClick = (option) => {
    if (!showResult) {
      setSelectedOption(option);
      setError(null);
      if (isVoiceEnabled) {
        speak(`Selected option: ${option}`);
      }
    }
  };

  // Handles answer submission
  const handleSubmit = () => {
    if (selectedOption === null) {
      setError("Please select an answer");
      if (isVoiceEnabled) {
        speak("Please select an answer");
      }
      return;
    }
    setError(null);
    const isCorrect = selectedOption === question.answer;
    setShowResult(true);
    onSubmitAnswer(selectedOption, isCorrect);
    if (isVoiceEnabled) {
      speak(
        isCorrect
          ? "Correct!"
          : "Incorrect. The correct answer is " + question.answer
      );
    }
  };

  // Handles navigation to the next question
  const handleNext = () => {
    setShowResult(false);
    onNextQuestion();
  };
  //Handles voice toggle
  const toggleVoice = () => {
    console.log("Toggle voice button clicked");
    setIsVoiceEnabled((prev) => {
      const newState = !prev;
      console.log("New voice state:", newState);
      if (newState) {
        speak("Voice enabled");
      } else {
        console.log("Voice disabled");
      }
      return newState;
    });
  };

  // Determines the CSS class for option buttons
  const getOptionClass = (option) => {
    let className = `option-button ${isDarkMode ? "dark-mode" : "light-mode"}`;
    if (showResult) {
      if (option === question.answer) {
        className += " correct";
      } else if (selectedOption === option) {
        className += " incorrect";
      }
    } else if (selectedOption === option) {
      className += " selected";
    }
    return className;
  };

  // Returns the result icon for an option
  const getResultIcon = (option) => {
    if (showResult) {
      if (option === question.answer) {
        return <span className="result-icon correct">✓</span>;
      } else if (selectedOption === option) {
        return <span className="result-icon incorrect">✗</span>;
      }
    }
    return null;
  };
  // JSX structure
  return (
    <div className="quiz-question">
      <div className="quiz-header">
        <div
          className={`quiz-title-container icon-${question.title.toLowerCase()}`}
        >
          <img src={question.icon} alt={question.title} className="quiz-icon" />
          <h3 className="quiz-title">{question.title}</h3>
        </div>
        <button onClick={toggleVoice} className="voice-toggle">
          {isVoiceEnabled ? "🔊" : "🔇"}
        </button>
      </div>
      <div className="question-options-container">
        <div className="question-container">
          <p className="question-number">
            Question {question.number} of {question.totalQuestions}
          </p>
          <h2 className="question-text">{question.question}</h2>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{
                width: `${(question.number / question.totalQuestions) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="options-container">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={getOptionClass(option)}
              disabled={showResult}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
              {getResultIcon(option)}
            </button>
          ))}
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="answer-button-container">
        {showResult ? (
          <button onClick={handleNext} className="answer-button">
            {isLastQuestion ? "Finish Quiz" : "Next Question"}
          </button>
        ) : (
          <button onClick={handleSubmit} className="answer-button">
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
}

// Prop types
QuizQuestion.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  onSubmitAnswer: PropTypes.func.isRequired,
  onNextQuestion: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default QuizQuestion;
