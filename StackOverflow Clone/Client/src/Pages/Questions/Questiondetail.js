import React , {useState} from 'react'
import { useNavigate, useParams , useLocation } from 'react-router-dom'
import moment from 'moment';
import copy from 'copy-to-clipboard'
import { useSelector ,useDispatch } from 'react-redux'
import Handupvote from '../../assets/sort-up.svg'
import Handdownvote from '../../assets/sort-down.svg'
import Avatar from '../../components/Avatar/avatar'
import { Link } from 'react-router-dom'
import Displayanswer from './Displayanswer'
import './Questions.css';
import '../../actions/question';
import { deleteQuestion, postAnswer , VoteQuestion} from '../../actions/question'


const Questiondetail = () => {
    var User = useSelector((state)=>(state.CurrentUserReducer));
    const {id} = useParams();
    const questionList = useSelector(state => state.questionReducer)

    //var questionsList = [{ 
    //    _id: '1',
    //    upVotes: 3,
    //    downVotes: 2,
    //    noOfAnswers: 2,
    //    questionTitle: "What is a function?",
    //    questionBody: "It meant to be",
    //    questionTags: ["java", "node js", "react js", "mongo db", "express js"],
    //    userPosted: "mano",
    //    userId: 1,
    //    askedOn: "jan 1",
    //    answer: [{
    //        answerBody: "Answer",
    //        userAnswered: 'kumar',
    //        answeredOn: "jan 2",
    //        userId: 2,
    //    }]
    //},{ 
    //    _id: '2',
    //    upVotes: 3,
    //    downVotes: 2,
    //    noOfAnswers: 0,
    //    questionTitle: "What is a function?",
    //    questionBody: "It meant to be",
    //    questionTags: ["javascript", "R", "python"],
    //    userPosted: "mano",
    //    askedOn: "jan 1",
    //    userId: 1,
    //    answer: [{
    //        answerBody: "Answer",
    //        userAnswered: 'kumar',
    //        answeredOn: "jan 2",
    //        userId: 2,
    //    }]
    //},{ 
    //    _id: '3',
    //    upVotes: 3,
    //    downVotes: 2,
    //    noOfAnswers: 0,
    //    questionTitle: "What is a function?",
    //    questionBody: "It meant to be",
    //    questionTags: ["javascript", "R", "python"],
    //    userPosted: "mano",
    //    askedOn: "jan 1",
    //    userId: 1,
    //    answer: [{
    //        answerBody: "Answer",
    //        userAnswered: 'kumar',
    //        answeredOn: "jan 2",
    //        userId: 2,
    //    }]
    //}]

    const [Answer, setAnswer] = useState('')
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    //console.log(User.result._id);

    const handlePostAns = (e, answerLength) =>{
        e.preventDefault()
        if(User === null){
            alert('Login or Signup to answer a question')
            Navigate('/Auth')
        }else{
            if(Answer === ''){
                alert('Enter an answer before submitting')
            } else{
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name , userId: User.result._id }))
            }
        }
    }

    const location = useLocation();
    const url  = 'http://localhost:3000'


    const HandleShare = () => {
        copy(url + location.pathname)
        alert('Copied Url:' + url + location.pathname)
    }

    const HandleDelete = () => {
        dispatch(deleteQuestion(id , Navigate))
    }

    const HandleDownVote = () => {
        dispatch(VoteQuestion(id , 'DownVote' ,User.result._id))
    }

    const HandleUpVote = () => {
        dispatch(VoteQuestion(id , 'upVote' , User.result._id))
    }

  return (
    <div className='question-details-page'>
       {
          questionList.data === null ? 
          <h1>Loading...</h1> :
          <>
               {
                  questionList.data.filter(question => question._id === id).map(question => (
                     <div key={question._id}>
                        <section className='question-details-container'>
                            <h1>{question.questionTitle}</h1>
                            <div className='question-details-container-2'>
                                <div className='question-votes'>
                                    <img src={Handupvote} alt='Handupvote'className='votes-icon' width={18} onClick={HandleUpVote}></img>
                                    <p>{question.upVote.length - question.downVote.length}</p>
                                    <img src={Handdownvote} alt='Handdownvote' className='votes-icon' width={18} onClick={HandleDownVote}></img>
                                </div>
                                <div style={{width:"100%"}}>
                                    <p className='question-body'>{question.questionBody}</p>
                                    <div className='question-details-tags'>
                                        {
                                            question.questionTags.map((tag)=>(
                                                <p key={tag}>{tag}</p>
                                            ))
                                        }
                                    </div>
                                    <div className='question-actions-user'>
                                        <div>
                                                <button type='button' onClick={HandleShare}>Share</button>
                                                {
                                                        User?.result?._id === question?.userId && (
                                                            <button type='button' onClick={HandleDelete}>Delete</button>
                                                        )
                                                }
                                        </div>
                                        <div>
                                            <p>asked {moment(question.askedOn).fromNow()}</p>
                                            <Link to={`/user/${question.userId} `} className='user-link' style={{color:'#0086d8'}}>
                                                <Avatar  backgroundColor="orange" px='8px' py='5px' borderRadius="4px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                            <div>
                                                {question.userPosted}
                                            </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {
                            question.noOfAnswers !== 0 && (
                                <section>
                                    <h3>{question.noOfAnswers} Answers</h3>
                                    <Displayanswer key={question._id} question={question} HandleShare={HandleShare} />
                                </section>
                            )
                        }
                        <section className='post-ans-container'>
                            <h3>Answer</h3>
                            <form onSubmit={ (e) => { handlePostAns(e, question.answer.length)}}>
                            <textarea cols={30} rows={10} onChange = {e => setAnswer(e.target.value)} ></textarea>
                            <input type="submit" className='post-ans-btn' value='Post your answer'  />
                            </form>
                            <p>
                                Browse Other question tagged
                                {
                                    question.questionTags.map((tag)=>
                                    (
                                        <Link to="/Tags" key={tag} className='ans-tags'>{tag}</Link>
                                    ))                                  
                                }
                                or <Link to='/askquestion' style={{textDecoration: "none", color:"#009dff"}} >Ask your own question</Link>
                            </p>
                        </section>
                     </div>
                  ))
               }
          </>
       }
    </div>
  )
}

export default Questiondetail
