import React from 'react';
import { Stage, Layer, Line, Text, Image } from 'react-konva';
import useImage from 'use-image';
import { useState, useEffect } from "react";

import Button from '../Button/Button'




function Draw() {



  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);

  const images = [
    "http://images.cocodataset.org/train2017/000000032907.jpg",
    "http://images.cocodataset.org/train2017/000000549399.jpg",
    "http://images.cocodataset.org/train2017/000000510755.jpg",
    "http://images.cocodataset.org/train2017/000000111076.jpg",
    "http://images.cocodataset.org/train2017/000000455483.jpg"
  ]


  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };



  const [index, setIndex] = useState(0);


  function next(){
    setIndex(index + 1)
  }
  function prev(){
    setIndex(index - 1)
  }


  const ShowedImage = () => {
  const [image] = useImage(images[index]);
  return <Image image={image} />;
  };

  return (
    <div>

    <Button func = {prev} name = "<" />
    <Button func = {next} name =">"/>
      <Button name = "SAVE" />


      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <Text text="" x={5} y={30} />

          <ShowedImage/>

          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>

    </div>
  );
};


export default Draw;
