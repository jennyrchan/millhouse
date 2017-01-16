import React from 'react';

function Review (props) {

  let arr = [];
  for (let i = 0; i < props.rating; i++) {
    arr.push(<img src={`/cheerio.jpg`} key={i} />);
  }

  return (
    <div>
      <h2>{ props.title }</h2>
      <p>{ props.body }</p>
      <h3>User Rating: {arr}</h3>
    </div>
  );
}

export default Review;
