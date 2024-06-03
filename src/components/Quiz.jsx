function Quiz() {
    console.log("Rendering Quiz component"); 
    const subjects = [
      { name: 'HTML', icon: '/src/assets/images/icon-html.svg' },
      { name: 'CSS', icon: '/src/assets/images/icon-css.svg' },
      { name: 'JavaScript', icon: '/src/assets/images/icon-js.svg' },
      { name: 'Accessibility', icon: '/src/assets/images/icon-accessibility.svg' },
    ];
  
    const handleSubjectClick = (subject) => {
      console.log(`Starting quiz for subject: ${subject.name}`);
      // Add logic to start the selected quiz
    };
  
    return (
      <div className="viewport-wrapper">
        <div className="quiz-container">
          {/* Background images */}
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
  