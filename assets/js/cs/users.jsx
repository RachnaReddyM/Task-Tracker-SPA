import React from 'react';
import { Link } from 'react-router-dom';

// Attribution: Inspired from Nat Tuck's microblog

function User(params) {
  return <p>{params.user.name} - <Link to={"/users/" + params.user.id}>posts</Link></p>;
}

export default function Users(params) {
  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
  return <div>
    { users }
  </div>;
}

