import { useState, useEffect } from "react";
import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Line, Text } from 'react-konva';

import Button from './components/Button/Button';
import Draw from './components/Draw/Draw';
import { Image } from 'react-konva';

import shortid from 'shortid';
import Rectangle from './components/Rectangle';
import RectTransformer from './components/RectTransformer';
import AnnotationImage from './components/Images';
import './App.css';
import useImage from 'use-image';

{/*
export default function App() {

  return (
    <div className="App">
      <Draw></Draw>
    </div>
<AnnotationImage />
  );
}
*/}



class App extends React.Component {
  state = {
    rectangles: [],
    rectCount: 0,
    selectedShapeName: '',
    mouseDown: false,
    mouseDraw: false,
    newRectX: 0,
    newRectY: 0,
    icount: 3,
  };

  componentDidMount() {
    this.img.moveToBottom();
  }

  handleStageMouseDown = (event) => {
    const { rectangles } = this.state;
    if (event.target.className === 'Image') {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      this.setState({
        mouseDown: true,
        newRectX: mousePos.x,
        newRectY: mousePos.y,
        selectedShapeName: '',
      });
      return;
    }

    const clickedOnTransformer = event.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    const name = event.target.name();
    const rect = rectangles.find(r => r.name === name);
    if (rect) {
      this.setState({
        selectedShapeName: name,
        rectangles,
      });
    } else {
      this.setState({
        selectedShapeName: '',
      });
    }
  };

  handleRectChange = (index, newProps) => {
    const { rectangles } = this.state;
    rectangles[index] = {
      ...rectangles[index],
      ...newProps,
    };

    this.setState({ rectangles });
  };

  handleNewRectChange = (event) => {
    const {
      rectangles, rectCount, newRectX, newRectY,
    } = this.state;
    const stage = event.target.getStage();
    const mousePos = stage.getPointerPosition();
    if (!rectangles[rectCount]) {
      rectangles.push({
        x: newRectX,
        y: newRectY,
        width: mousePos.x - newRectX,
        height: mousePos - newRectY,
        name: `rect${rectCount + 1}`,
        stroke: '#00A3AA',
        key: shortid.generate(),
      });
      return this.setState({ rectangles, mouseDraw: true });
    }
    rectangles[rectCount].width = mousePos.x - newRectX;
    rectangles[rectCount].height = mousePos.y - newRectY;
    return this.setState({ rectangles });
  };

  handleStageMouseUp = () => {
    const { rectCount, mouseDraw } = this.state;
    if (mouseDraw) {
      this.setState({ rectCount: rectCount + 1, mouseDraw: false });
    }
    this.setState({ mouseDown: false });
  };



  counter = true;

  change = () => {

    if (this.counter == true) {
      alert("Attention: In this environment I have tried to implement my own method.")
      this.counter = false;
      this.forceUpdate();
    } else {
      alert("For full functionality reload the page")
      this.counter = true;
      this.forceUpdate();
    }

  };

  next = () => {
    this.setState(
      prevState => ({ icount: prevState.icount + 1 })
    )
    alert("Status of the state variable: " + this.state.icount + " | I have no idea why the picture is only correct when manually adjusting the variables in the code or switching back and forth to the other mode. Apparently it is not rendering here. Even with a forceUpdate command, the image is not updated, even though react should do it on its own.")
  }

  prev = () => {
    this.setState(
      prevState => ({ icount: prevState.icount - 1 })
    )
    alert("Status of the state variable: " + this.state.icount + " | I have no idea why the picture is only correct when manually adjusting the variables in the code or switching back and forth to the other mode. Apparently it is not rendering here. Even with a forceUpdate command, the image is not updated, even though react should do it on its own.")
  }

  save = () => {
    localStorage.setItem('BoundingBox', JSON.stringify(this.state));
    alert("JSON file of the bounding box is created")
  }






  render() {
    const {
      state: { rectangles, selectedShapeName, mouseDown },
      handleStageMouseDown,
      handleNewRectChange,
      handleRectChange,
      handleStageMouseUp,
      counter,
      icount,
    } = this;
    return (
      <div id="app">

      <Button func = {this.prev} name = "<" />
      <Button func = {this.next} name = ">" />
      <Button func = {this.save} name = "SAVE" />



      <label class="switch">
        <input type="checkbox" onClick={this.change}></input>
        <span class="slider round"></span>
      </label>




      {this.counter == false &&
             <Draw></Draw>
      }


      {this.counter == true &&


        <Stage
          ref={(node) => {
            this.stage = node;
          }}
          container="app"
          width={994}
          height={640}
          onMouseDown={handleStageMouseDown}
          onTouchStart={handleStageMouseDown}
          onMouseMove={mouseDown && handleNewRectChange}
          onTouchMove={mouseDown && handleNewRectChange}
          onMouseUp={mouseDown && handleStageMouseUp}
          onTouchEnd={mouseDown && handleStageMouseUp}
        >


          <Layer>
            {rectangles.map((rect, i) => (
              <Rectangle
                sclassName="rect"
                key={rect.key}
                {...rect}
                onTransform={(newProps) => {
                  handleRectChange(i, newProps);
                }}
              />
            ))}
            <RectTransformer selectedShapeName={selectedShapeName} />
          </Layer>
          <Layer
            ref={(node) => {
              this.img = node;
            }}
          >
          <AnnotationImage index={this.state.icount}/>

          </Layer>

        </Stage>

      }

      </div>
    );
  }
}

export default App;
