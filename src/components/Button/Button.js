import React from 'react';
import { useState, useEffect } from "react";


function Button(props) {

  return (
    <button onClick={props.func}> {props.name} {props.children}</button>
  )
}



export default Button;
