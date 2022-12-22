import { combineReducers } from "redux";
import authReducer from './auth'
import CurrentUserReducer from "./CurrentUserReducer";
import questionReducer from './questionReducer';
import usersReducer from "./users";


export default combineReducers({
    authReducer , CurrentUserReducer ,questionReducer , usersReducer
})