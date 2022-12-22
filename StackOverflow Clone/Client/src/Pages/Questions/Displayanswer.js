import React from 'react'
import moment from 'moment'
import { Link , useParams} from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import Avatar from '../../components/Avatar/avatar'
import { deleteAnswer } from '../../actions/question'


const Displayanswer = ({question , HandleShare}) => {
    var User = useSelector((state)=>(state.CurrentUserReducer));
    const { id } = useParams()
    const dispatch = useDispatch()
    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1))
    }
  return (
    <div>
      {
        question.answer.map((ans)=>(
            <div className='display-ans' key={ans._id}>
                <p>{ans.answerBody}</p>
                <div className='question-actions-user'>
                    <div>
                        <button type='button' onClick={HandleShare}>Share</button>
                        {
                            User?.result?._id === ans?.userId && (
                                <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers )}>Delete</button>
                            )
                        } 
                        
                    </div>
                    <div>
                        <p>answered {moment(ans.answeredOn).fromNow()}</p>
                        <Link to={`/users/${question.userId} `} className='user-link' style={{color:'#0086d8'}}>
                            <Avatar backgroundColor="lightgreen" px='8px' py='5px' borderRadius='4px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                            <div>
                                {ans.userAnswered}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default Displayanswer
