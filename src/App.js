import { useState, useEffect } from "react";
import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Line, Text } from 'react-konva';

import Button from './components/Button/Button'
import Draw from './components/Draw/Draw'

{/*import {images} from './mockimages/Images/Images'*/}

export default function App() {
  
  return (
    <div className="App">
      <Draw></Draw>
    </div>
  );
}
