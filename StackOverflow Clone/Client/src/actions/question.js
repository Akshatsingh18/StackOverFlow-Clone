import * as api from '../Api/index'

export const askquestion = (questionData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.postQuestion(questionData)
        dispatch({ type: "POST_QUESTION", payload: data})
        dispatch(FetchAllQuestion());
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const FetchAllQuestion = () => async (dispatch) => {
    try{
        const { data } = await api.getLAllquestion()
        dispatch({type: "FETCH_ALL_QUESTION" , payload:data})
    }
    catch(error){
        console.log(error);
    }
}


export const deleteQuestion = (id, navigate) => async (dispatch) => {
    try {
        await api.deleteQuestion(id)
        dispatch(FetchAllQuestion())
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const VoteQuestion = (id , value ,userId) => async (dispatch) => {
    try {
        await api.VoteQuestion(id , value , userId) 
        dispatch(FetchAllQuestion())
    }
    catch (error)
    {
        console.log(error)
    }
}


export const postAnswer = (answerData) => async (dispatch) => {
    try {
        const { id, noOfAnswers, answerBody, userAnswered , userId } = answerData;
        const { data } = await api.postAnswer( id, noOfAnswers, answerBody, userAnswered ,userId )
        dispatch({ type: 'POST_ANSWER', payload: data})
        dispatch(FetchAllQuestion())
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
    try {
        await api.deleteAnswer(id, answerId, noOfAnswers)
        dispatch(FetchAllQuestion())
    } catch (error) {
        console.log(error)
    }
} 