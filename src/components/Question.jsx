import PropTypes from 'prop-types';

function Question({ question, options, onSelectOption }) {
  return (
    <div className="question">
      <h3>{question}</h3>
      {options.map((option, index) => (
        <button key={index} onClick={() => onSelectOption(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectOption: PropTypes.func.isRequired,
};

export default Question;
