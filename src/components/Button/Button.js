import React from 'react';
import { useState, useEffect } from "react";
import '../../App.css';



function Button(props) {

  return (
    <button class="button" onClick={props.func}> {props.name} {props.children}</button>
  )
}



export default Button;
