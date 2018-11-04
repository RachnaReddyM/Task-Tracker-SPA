import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

//Attribution: Nat Tuck's microblog SPA git.

function tasks(state = [], action) {
  switch (action.type) {
  case 'TASKS_LIST':
    return [...action.tasks];
  case 'ADD_TASK':
    return [action.task, ...state];
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  default:
    return state;
  }
}


let empty_form = {
  user_id: "",
  title: "",
  description: "",
  assignee: "",
  completed: "",
  time_taken: "",
  token: "",
};

function form(state = empty_form, action) {
  switch (action.type) {
  case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
  case 'CLEAR_FORM':
      return Object.assign(call_clearform(state), action.data);
  case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
  default:
      return state;
  }
}

function call_clearform(state)
{
  let new_state =
  {
    user_id: state.user_id,
    title: "",
    description: "",
    assignee: "",
    completed: "",
    time_taken: "",
    token: state.token,
  }

  return new_state;
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    default:
      return state;
  }
}

let empty_login = {
  email: "",
  pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

let empty_register = {
  uname: "",
  email: "",
  password: "",
};

function register(state = empty_register, action) {
  switch (action.type) {
    case 'UPDATE_REGISTER_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}


function root_reducer(state0, action) {
  console.log("reducer", action);
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({tasks, users, form, token, login, register});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;