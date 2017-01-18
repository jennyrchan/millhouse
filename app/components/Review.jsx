import React from 'react';

function Review (props) {

  let arr = [];
  for (let i = 0; i < props.rating; i++) {
    arr.push(<img className="img-circle" src={`/cheerio.png`} key={i} />);
  }

  return (
    <div id="review" className="background-text-box">
      <h2>{ props.title }{ props.pencil }</h2>
      <p>{ props.body }</p>
      <h3>User Rating: {arr}</h3>
    </div>
  );
}

export default Review;
