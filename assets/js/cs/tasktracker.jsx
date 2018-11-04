import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import apijs from '../api';

import Nav from './nav';
import Feed from './feed';
import Users from './users';
import TaskForm from './task-form';
import RegisterationForm from './register';


//Attribution: Nat Tuck's microblog SPA git.

export default function tasktracker_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Tasktracker state={store.getState()} />
    </Provider>,
    document.getElementById('root'),
  );
 }


let Tasktracker = connect((state) => state)((props) => {
  console.log("propshere", props);
  console.log("from token");
  console.log("token",props.token);

  if(props.token!=null)
  {
    return (
      <Router>
        <div>
          <Nav />

          <Route path="/" exact={true} render={() =>
            <div>
              <TaskForm />
              <Feed user={props.token} tasks={props.tasks} />
            </div>
          } />

         </div>
      </Router>
    );
  }

  else
  {
  return (
      <Router>
        <div>
          <Nav />
            <RegisterationForm />
        </div>
      </Router>
    );
}
});