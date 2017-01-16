import React from 'react';

function Review (props) {

  let arr = [];
  for (let i = 0; i < props.rating; i++) {
    arr.push(<img src={`/cheerio.jpg`} key={i} />);
  }

  return (
    <div>
      <h1>{ props.title }</h1>
      <h2>{ props.body }</h2>
      <h2>User Rating: {arr}</h2>
    </div>
  );
}

export default Review;
