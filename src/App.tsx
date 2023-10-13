import {useState, useEffect} from 'react';
import './App.css';


function App() {
  const [question, setQeustion] = useState({question: '', incorrect_answers: [], correct_answer: ""})
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
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
      }
        )
  }

  function Question() {
    return <div dangerouslySetInnerHTML={ {__html: question.question} }></div>
  }

  function submitAnswer(answer: string) {
    setRevealAnswer(true)
    if (answer == question.correct_answer) {
      setScore(score + 1)
    }
    setQuestionsAnswered(questionsAnswered + 1)
    setTimeout(getQuestion, 1500)
  }

  const incorrectAnswers = question.incorrect_answers?.map(answer => <button onClick={() => submitAnswer(answer)}>{answer}</button>)
  const correctAnswer = <button onClick={() => submitAnswer(question.correct_answer)} className={revealAnswer ? 'button-correct' : ''}>{question.correct_answer}</button>
  const allAnswers = incorrectAnswers.concat(correctAnswer)

  const isAnswerCorrect = <div>{(answer === question.correct_answer) ? 'True': 'False'}</div>



  return (
    <div>
      <div>
        <h1>Ceist</h1>
        <h2>A trivia app</h2>
      </div>
      <Question></Question>
      {allAnswers}
      {isAnswerCorrect}
      <div>{score} of {questionsAnswered}</div>
    </div>
  );
}

export default App;
