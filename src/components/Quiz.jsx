import React, { useState, useEffect } from 'react'



import Data from './Data'

const Quiz = () => {

    const [currQuention, setCurrQuestion] = useState(0);
    const [selectedOpt, setSelectedOpt] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [attemptQues, setAttemptQues] = useState(0);
    const [timer, setTimer] = useState(15);



    useEffect(() => {
        if (showScore) return 
        if (timer === 0) {
            handleSubmit(); // Automatically move to the next question
        }
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);  // when click the next button or change the question interval will clear.
    }, [timer, showScore]);



    // Function for handle Submit buttton
    const handleSubmit = () => {
        if (selectedOpt === Data[currQuention].answer) {
            setScore(score + 1)
        }

        setAttemptQues(attemptQues + 1);

        const nextQuest = currQuention + 1;

        if (nextQuest < Data.length) {

            setCurrQuestion(nextQuest);
            setSelectedOpt('');
            setTimer(15);
        }
        else {
            setShowScore(true);

        }
    }


    // Implement function for handle Change
    const handlChange = (e) => {
        setSelectedOpt(e.target.value)
    };


    return (

        <div>
            <div className="timer-container">
                <i className="fas fa-clock timer-icon"></i>
                <div
                    className="timer"

                ></div>
                {!showScore && <p>{timer}s</p>}
            </div>
            <h1>Let's Start Quiz</h1>
            {showScore ? (
                <div>
                    <h3>Your Score: {score} / {Data.length}</h3>
                    <p>You attempted {attemptQues} out of {Data.length} questions</p>
                    <button
                        className='quiz-reset'
                        onClick={() => {
                            setCurrQuestion(0);
                            setScore(0);
                            setSelectedOpt('');
                            setShowScore(false);
                            setAttemptQues(0);
                            setTimer(15);



                        }}
                    >Reset</button>
                </div>
            ) : (
                <div>
                    <h3>Q.{currQuention + 1} {Data[currQuention].question}</h3>

                   
                    <form>
                        {Data[currQuention].options.map((option, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name="quiz-option"
                                        value={option}
                                        checked={selectedOpt === option}
                                        onChange={handlChange}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </form>
                    <p>You attempted {attemptQues} out of {Data.length} questions</p>
                    <button
                        className="quiz-next"
                        onClick={handleSubmit}
                        disabled={!selectedOpt}
                    >
                        Next
                        
                    </button>
                    

                </div>
            )}

        </div>


    )
}

export default Quiz