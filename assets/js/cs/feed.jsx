import React from 'react';
import Task from './task';

// Attribution: Inspired from Nat Tuck's microblog


export default function Feed(params) {

  let tasks = _.map(params.tasks, (pp) => <Task key={pp.id} task={pp} userDetails={params.user} />);
  
  return <div>
    { tasks }
  </div>;
}