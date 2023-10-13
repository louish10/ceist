import {useState, useEffect} from 'react';
import './App.css';


function App() {
  const [question, setQeustion] = useState({question: '', incorrect_answers: [], correct_answer: ""})
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const [revealAnswer, setRevealAnswer] = useState(false)
  useEffect(() => {
    if (question.question === '') {
      getQuestion()
    }
  })
  function getQuestion() {
    fetch("https://opentdb.com/api.php?amount=1")
      .then(res => res.json())
      .then(data => {
        setRevealAnswer(false)
        setQeustion(data.results[0])
      })
      .catch(err => console.log(err)
    )
  }

  function Question() {
    return <div className="question" dangerouslySetInnerHTML={ {__html: question.question} }></div>
  }

  function submitAnswer(answer: string) {
    setRevealAnswer(true)
    if (answer == question.correct_answer) {
      setScore(score + 1)
    }
    setQuestionsAnswered(questionsAnswered + 1)
    setTimeout(getQuestion, 1000)
  }

  const incorrectAnswers = question.incorrect_answers?.map(answer => <button className="button" onClick={() => submitAnswer(answer)} disabled={revealAnswer} dangerouslySetInnerHTML={{__html: answer}}></button>)
  const correctAnswer = <button onClick={() => submitAnswer(question.correct_answer)} disabled={revealAnswer} className={revealAnswer ? 'button button-correct' : 'button'} dangerouslySetInnerHTML={ {__html: question.correct_answer} }></button>
  const allAnswers = incorrectAnswers.concat(correctAnswer)

  const isAnswerCorrect = <div>{(answer === question.correct_answer) ? 'True': 'False'}</div>



  return (
    <div className="app">
      <div className="content">
        <div className="title">
          <h1 className="title-header">Ceist</h1>
          <h2 className="title-subheader">A trivia app</h2>
        </div>
        <Question></Question>
        <div className="answer-container">
          {allAnswers}
        </div>
        <div>{score} of {questionsAnswered}</div>
      </div>
    </div>
  );
}

export default App;
