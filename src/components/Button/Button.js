import React from 'react';
import { useState, useEffect } from "react";


function Button(props) {

  function next(){
    props.setIndex(props.index + 1)
  }
  function prev(){
    props.setIndex(props.index - 1)
  }

  return (
    <button onClick={props.func}> {props.name} {props.children} {props.index}</button>
  )
}



export default Button;
