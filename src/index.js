// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
import {combineReducers,applyMiddleware,createStore} from 'redux'
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import axios from 'axios'
//Create reducers to update store
// const reducer=function(state,action){
//     if(action.type==='INC'){
//         return state+action.payload
//     }
//     if(action.type==='DEC'){
//         return state-action.payload
//     }
//     return state
// }

// //Creating store and attaching to reducer with initial state
// const middleware=applyMiddleware(logger)
// const store = createStore(reducer,1,middleware)

// //Subscribe to store to get new state
// store.subscribe(()=>{
//     console.log("Store Changed : "+store.getState())
// })

// //Dispatch action to invoke reducer
// store.dispatch({type:"INC", payload:1})
// store.dispatch({type:"INC", payload:3})
// store.dispatch({type:"DEC", payload:10})

//With Comibine Reducers
//npm install redux-devtools-extension --save-dev

// const userReducer=(state={},action) =>{
//     switch(action.type){
//         case "CHANGE_NAME":{
//             return state = {...state, name:action.payload}
//         }
//         case "CHANGE_AGE":{
//             return state = {...state, age:action.payload}
//         }

//     }
//     return state
// }
// const tweetReducer=(state=[],action)=>{
//     return state
// }
// const reducers = combineReducers({
//     user:userReducer,
//     tweets:tweetReducer
// })
// const store = createStore(reducers,composeWithDevTools(applyMiddleware(logger)))
// store.subscribe(()=>{
//     console.log("Store Changed : "+store.getState())
// })
// store.dispatch({type:"CHANGE_NAME",payload:"Soham"})
// store.dispatch({type:"CHANGE_AGE",payload:9})
// store.dispatch({type:"CHANGE_NAME",payload:'SHAH'})

//Async actions with Redux Thunk and Axios
//npm install redux-think --save
const initialState={
    fetching:false,
    fetched:false,
    user:[],
    error:null
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case "FETCH_USERS_START":{
            return{...state,fetching:true}
        }
        case "FETCH_USER_ERROR":{
            return {...state,fetching:false,error:action.payload}
        }
        case "RECEIVE_USERS":{
            return{
                ...state,
                fetching:false,
                fetched:true,
                users:action.payload
            }
        }
    }
    return state
}
const middleware=composeWithDevTools(applyMiddleware(thunk,logger))
const store=createStore(reducer,middleware)
store.dispatch((dispatch)=>{
    //multiple actions occur with single acion
    dispatch({
        type:"FETCH_USERS_START"
    })
    axios.get("https://jsonplaceholder.typicode.com/users").then((
        response =>{
            dispatch({
                type:"RECEIVE_USERS",payload:response.data
            })
        }
    )).catch((error)=>{
        dispatch({
            type:"FETCH_USERS_ERROR",
            payload:error
        })
    })
})
