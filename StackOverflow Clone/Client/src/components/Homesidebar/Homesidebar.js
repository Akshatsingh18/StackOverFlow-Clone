import React from 'react'
import { useLocation } from 'react-router-dom'
import QuestionsList from './QuestionList'
import './Homesidebar.css'
import {  useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Homesidebar = () => {
  const user = 1;
  const navigate = useNavigate();

  const questionList = useSelector(state => state.questionReducer)
  //console.log(questionList);



  //var questionsList = [{ 
  //       _id: 1,
  //       Votes: 3,
  //       downVotes: 2,
  //       noOfAnswers: 2,
  //       questionTitle: "What is a function?",
  //       questionBody: "It meant to be",
  //       questionTags: ["java", "node js", "react js", "mongo db", "express js"],
  //       userPosted: "mano",
  //       userId: 1,
  //       askedOn: "jan 1",
  //       answer: [{
  //           answerBody: "Answer",
  //           userAnswered: 'kumar',
  //           answeredOn: "jan 2",
  //           userId: 2,
  //       }]
  //   },{ 
  //       _id: 2,
  //       Votes: 3,
  //       downVotes: 2,
  //       noOfAnswers: 0,
  //       questionTitle: "What is a function?",
  //       questionBody: "It meant to be",
  //       questionTags: ["javascript", "R", "python"],
  //       userPosted: "mano",
  //       askedOn: "jan 1",
  //       userId: 1,
  //       answer: [{
  //           answerBody: "Answer",
  //           userAnswered: 'kumar',
  //           answeredOn: "jan 2",
  //           userId: 2,
  //       }]
  //   },{ 
  //       _id: 3,
  //       Votes: 3,
  //       downVotes: 2,
  //       noOfAnswers: 0,
  //       questionTitle: "What is a function?",
  //       questionBody: "It meant to be",
  //       questionTags: ["javascript", "R", "python"],
  //       userPosted: "mano",
  //       askedOn: "jan 1",
  //       userId: 1,
  //       answer: [{
  //           answerBody: "Answer",
  //           userAnswered: 'kumar',
  //           answeredOn: "jan 2",
  //           userId: 2,
  //       }]
  //   }]

     const checkauth = () => {
      if(user === null)
      {
        alert('Login or Sighnup to ask a a question')
        navigate('/auth')
      }
      else
      {
        navigate('/askquestion')
      }
     }



  const location = useLocation();
  return (
    <div className='main-bar'>
       <div className='main-bar-header'>
        {
          location.pathname === '/' ? (<h1>Top Questions</h1>) : (<h1>All Questions</h1>)
        }
        <button onClick={checkauth} className='ask-btn'>Ask Question</button>
        </div>
        <div>
          {
             questionList.data === null ? 
             <h1>Loading....</h1> : 
             <>
             <p>{questionList.data.length}questions</p>
             <QuestionsList questionsList={questionList.data} />
             </>
          }
          </div>
    </div>
  )
}

export default Homesidebar
