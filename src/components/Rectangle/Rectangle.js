import React from 'react';
import { Rect } from 'react-konva';

class Rectangle extends React.Component {

  componentDidUpdate() {
    this.rect.getLayer().batchDraw();
  }

  handleChange = (event) => {
    const {
      props: { onTransform },
    } = this;
    const shape = event.target;

    onTransform({
      x: shape.x(),
      y: shape.y(),
      width: shape.width() * shape.scaleX(),
      height: shape.height() * shape.scaleY(),
      rotation: shape.rotation(),
    });
  };


  handleMouseEnter = (event) => {
    const shape = event.target;
    shape.stroke('#3DF6FF');
    shape.getStage().container().style.cursor = 'move';
    this.rect.getLayer().draw();
  };

  handleMouseLeave = (event) => {
    const shape = event.target;
    shape.stroke('#00A3AA');
    shape.getStage().container().style.cursor = 'crosshair';
    this.rect.getLayer().draw();
  };

  render() {
    const {
      props: {
        x, y, width, height, name, stroke,
      },
      handleChange,
      handleMouseEnter,
      handleMouseLeave,
    } = this;
    return (
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}

        scaleX={1}
        scaleY={1}
        stroke={stroke}
        strokeWidth={5}
        name={name}
      
        onDragEnd={handleChange}
        onTransformEnd={handleChange}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        ref={(node) => {
          this.rect = node;
        }}
      />
    );
  }
}

export default Rectangle;
