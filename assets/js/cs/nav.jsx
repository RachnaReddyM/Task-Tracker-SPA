import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

//Attribution: Nat Tuck's microblog SPA git.

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    console.log("enter update in email");
    let tgt = $(ev.target);
    let data = {};
    console.log("email value");
    console.log(tgt.val());
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="email" placeholder="email"
               value={props.login.email} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
    </Form>
  </div>;
});



let Session = connect(({token}) => {return {token};})((props) => {

  function logoutUser()
  {
     window.location.reload();
  }

  return (
    <div className="row">
    
    <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">All Tasks</NavLink>
        </NavItem>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <NavItem>
          <div className="navbar-text">
            User id = { props.token.user_id }
          </div>
        </NavItem>
        <NavItem>
        <div className="to-float">
           <Button onClick={logoutUser} color="info">Log Out</Button>
        </div>
        </NavItem>


    </ul>
    
  </div>);
});

function Nav(props) {
  let session_info;
  if (props.token) {
    session_info = <Session token={props.token} />;
    
  }
  else {
    session_info = <LoginForm />
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Task Tracker
      </span>
      
      { session_info }
    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);


