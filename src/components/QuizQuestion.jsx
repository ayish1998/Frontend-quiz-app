import React, { useState } from "react";
import PropTypes from "prop-types";
import "../layouts/QuizQuestion.css";

function QuizQuestion({
  question,
  onSubmitAnswer,
  isLastQuestion,
  isDarkMode,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (option) => {
    if (!showResult) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === question.answer;
    setShowResult(true);
    onSubmitAnswer(selectedOption, isCorrect);
  };

  const handleNext = () => {
    onSubmitAnswer(null, false);
  };

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

  return (
    <div className="quiz-question">
      <div className="quiz-header">
        <div
          className={`quiz-title-container icon-${question.title.toLowerCase()}`}
        >
          <img src={question.icon} alt={question.title} className="quiz-icon" />
          <h3 className="quiz-title">{question.title}</h3>
        </div>
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
              {showResult && option === question.answer && (
                <span className="result-icon correct">✓</span>
              )}
              {showResult &&
                selectedOption === option &&
                option !== question.answer && (
                  <span className="result-icon incorrect">✗</span>
                )}
            </button>
          ))}
        </div>
      </div>
      <div className="answer-button-container">
        <button
          onClick={showResult ? handleNext : handleSubmit}
          disabled={selectedOption === null}
          className="answer-button"
        >
          {showResult
            ? isLastQuestion
              ? "Finish Quiz"
              : "Next Question"
            : "Submit Answer"}
        </button>
      </div>
    </div>
  );
}

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
  isLastQuestion: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default QuizQuestion;
