import React, { useState } from "react";
import PropTypes from "prop-types";
import "../layouts/QuizQuestion.css";

function QuizQuestion({
  question,
  onSubmitAnswer,
  onNextQuestion,
  isLastQuestion,
  isDarkMode,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleAnswer = () => {
    if (selectedOption !== null) {
      onSubmitAnswer(selectedOption);
      setSelectedOption(null);
      if (!isLastQuestion) {
        onNextQuestion();
      }
    }
  };

  return (
    <div className="quiz-question">
      <div className="quiz-header">
        <div className={`quiz-title-container icon-${question.title.toLowerCase()}`}>
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
              className={`option-button ${
                selectedOption === option ? "selected" : ""
              }`}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="answer-button-container">
        <button
          onClick={handleAnswer}
          disabled={selectedOption === null}
          className="answer-button"
        >
          {isLastQuestion ? "Submit Quiz" : "Next Question"}
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
  }).isRequired,
  onSubmitAnswer: PropTypes.func.isRequired,
  onNextQuestion: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,

};

export default QuizQuestion;