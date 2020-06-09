import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import App from './App'

let initialOrgState = {
  orgs: []
}

let orgReducer = (state = initialOrgState, action) => {
  switch(action.type) {
    case "SET_ALL_ORGS":
      return {
        ...state,
        orgs: action.payload
      }
    case "CREATE_ORG":
    return {
      ...state,
      orgs: [...state.orgs, action.payload]
    }
    default:
      return state
  }
}

let initialUserState = {
  users: [],
  id: 0,
  username: "",
  email_address: "",
  token: ""
}

let userReducer = (state = initialUserState, action) => {
  switch(action.type) {
    case "SET_ALL_USERS":
      return {
        ...state,
        users: action.payload
      }
    case "CREATE_USER":
    return {
      ...state,
      users: [...state.users, action.payload]
    }
    case "SET_USER_INFO":
    return {
      ...state,
      id: action.payload.user.id,
      username: action.payload.user.username,
      email_address: action.payload.user.email_address,
      token: action.payload.jwt
    }
    default:
      return state
  }
}

let singleObject = {
  orgInformation: orgReducer,
  userInformation : userReducer
}

let rootReducer = combineReducers(singleObject)

let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>    
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)