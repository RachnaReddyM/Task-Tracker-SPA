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


//Attribution: Nat Tuck's microblog SPA git.
let RegisterForm = connect(({register}) => {return {register};})((props) => {
  function update(ev) {
    console.log(" in new...");
    let tgt = $(ev.target);
    let data = {};
    console.log("email value");
    console.log(tgt.val());
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_REGISTER_FORM',
      data: data,
    });
  }

  function registerUser(ev)
{

  if (props.register.uname == undefined)
  {
    alert("Please enter your name");
  }

  else if (props.register.email == undefined)
  {
    alert("Please enter a email id"); 
  }

  else if(!checkEmail())
  {
    alert("Please enter a valid email id");
  }

  else if (props.register.password == undefined || (props.register.password).length< 8)
  {
    alert("Please enter atleast 8 characters for password");
  }
  
  else 
  {
    
    apijs.create_user(props.register);
    alert("Registeration Successful");
    window.location.reload();
  }


}

function checkEmail()
{
  
  let enteredEmail = props.register.email;
  var regex = /^[a-zA-Z0-9_\.#*]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
  return regex.test(enteredEmail);

}

return (
          <div>    
            <h1> SignIn/SignUp to create/view tasks </h1>
            <p> If you are returning user, Log in to create/view tasks </p>
            <p> If you are a new user, please fill the form below and register</p>
            
            <h2>Register!</h2>
            <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="uname" placeholder="Your Name" value={props.register.uname} onChange={update} />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email ID</Label>
              <Input type="text" name="email" placeholder="Your Email ID" value={props.register.email} onChange={update} />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" placeholder="Enter minimum 8 characters" value={props.register.password} onChange={update} />
            </FormGroup>
            <Button onClick={registerUser}>Register</Button>
            </Form>
          </div>

    );

});

function RegisterForm(props) {

  let form = <RegisterForm/>
  return(
    {form}
    );

}

function state2props(state) {
  return { 
  register: state.register, 
  users: state.users,
  };
}

// Export the result of a curried function call.
export default connect(state2props)(RegisterForm);