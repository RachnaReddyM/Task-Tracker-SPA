import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

//Attribution: Nat Tuck's microblog SPA git.

function TaskForm(props) {
  console.log("props@PostForm", props);

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};

    // Attribution: stack-overflow

    if(tgt.attr('name') == "completed"){
      data["completed"] = $(tgt).is(':checked') ? 'true' : 'false'; 
    }
    else{

      data[tgt.attr('name')] = tgt.val();
    }


    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    console.log("in submit checking values");

    console.log(props.form.title);

    console.log(props.form.description);

    console.log(props.form.assignee);

    if(props.form.title == "")
    {

       alert("Task title cannot be empty");
    }

    else if(props.form.description == "")
    {
       alert("Task description cannot be empty");
    }
    else if(props.form.assignee == "")
    {
       alert("Assign the task to someone");
    }

    else if((props.form.time_taken)%15 !=0)
    {
       alert("time should be multiples of 15");
    }
    else
    {
       api.submit_task(props.form);
    }
  }


  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
  }

let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.name}>{uu.name}</option>);
  return <div style={{padding: "4ex"}}>
    <h2>New Task</h2>

    <FormGroup>
      <Label for="title">Task Title</Label>
      <Input type="text" name="title" value={props.form.title} onChange={update} />
    </FormGroup>

    <FormGroup>
      <Label for="description">Task Description</Label>
      <Input type="textarea" name="description" value={props.form.description} onChange={update} />
    </FormGroup>

    <FormGroup>
      <Label for="user_id">Assignor</Label>
      <Input type="text" name="user_id" value={props.form.user_id} onChange={update} readOnly/>
    </FormGroup>


    <FormGroup>
      <Label for="assignee">Assignee</Label>
      <Input type="select" name="assignee" value={props.form.assignee} onChange={update}>
        <option key="empty" value=" "></option> 
        { users }
      </Input>
    </FormGroup>

    <FormGroup>
      <Label for="completed">Completed</Label>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Input type="checkbox" name="completed" value={props.form.completed} onChange={update}/>
    </FormGroup>


    <FormGroup>
      <Label for="time_taken">Time taken(in_minutes)</Label>
      <Input type="number" name="time_taken" min="0" step="15" value={props.form.time_taken} onChange={update} />
    </FormGroup>
    <Button onClick={submit} color="primary">Add Task</Button> &nbsp;
    <Button onClick={clear}>Clear</Button>
  </div>;
}

function state2props(state) {
  console.log("rerender@TaskForm", state);
  return {
    form: state.form,
    users: state.users,
  };
}


// Export the result of a curried function call.
export default connect(state2props)(TaskForm);