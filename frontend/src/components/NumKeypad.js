import React from 'react';


const NumKeypad = (props) => {
  return (
      <div className={'NumKeypad'}>
          <div> <button onClick={props.pusher} value={1}>1</button> <button onClick={props.pusher} value={2}>2</button> <button onClick={props.pusher} value={3}>3</button></div>
          <div> <button onClick={props.pusher} value={4}>4</button> <button onClick={props.pusher} value={5}>5</button> <button onClick={props.pusher} value={6}>6</button></div>
          <div> <button onClick={props.pusher} value={7}>7</button> <button onClick={props.pusher} value={8}>8</button> <button onClick={props.pusher} value={9}>9</button></div>
          <div> <button onClick={props.pusher} value={0}>0</button></div>
      </div>
  )
};

export default NumKeypad;