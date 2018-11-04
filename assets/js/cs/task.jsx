import React from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import apijs from '../api';
import storejs from '../store';


export default function Task(props) {

let task = props.task;
let userData = props.userDetails;

// function to edit the task
function edit()
{
  let form_reload =
  {
    user_id: userData.user_id,
    title: task.title,
    description: task.description,
    assignee: task.assignee,
    completed: task.completed,
    time_taken: task.time_taken,

  };

  let to_load =
  {
    type: 'UPDATE_FORM',
    data: form_reload,
  };

  apijs.deletetask(task.id); // delete the pre-created task
  storejs.dispatch(to_load); // call to dispatch to load the form


}


// function to delete the task from database
function deletetask()
{
   apijs.deletetask(task.id);
}

  
  return (<Card>
    <CardHeader>Assignor: <b>{ task.user.name } </b></CardHeader>
    <CardBody>
      <div>
        <p><span>Title : </span>{ task.title }</p>
        <p>Assignee <b>{ task.assignee }</b></p>
        <p><span>Description : </span>{ task.description }</p>
        <p><span>Time taken : </span>{ task.time_taken }</p>
        <p><span>Completed? : </span>{ task.completed ? "Completed!" :"Not Completed!" }</p>
        
      </div>
    </CardBody>
    <CardFooter>
    <Button onClick={edit} color="primary">Edit Task</Button> &nbsp;
    <Button onClick={deletetask} color="danger">Delete Task</Button>
    </CardFooter>
  </Card>);
}