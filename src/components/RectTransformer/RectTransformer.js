import React from 'react';
import { Transformer } from 'react-konva';

class RectTransformer extends React.Component {
  componentDidMount() {
    this.checkNode();
  }

  componentDidUpdate() {
    this.checkNode();
  }

  checkNode = () => {
    const stage = this.transformer.getStage();
    const { selectedShapeName } = this.props;
    const selectedNode = stage.findOne(`.${selectedShapeName}`);
    if (selectedNode === this.transformer.node()) {
      return;
    }

    if (selectedNode) {
      this.transformer.attachTo(selectedNode);
    } else {
      this.transformer.detach();
    }
  };

  render() {
    return (
      <Transformer
        ref={(node) => {
          this.transformer = node;
        }}
        rotateEnabled={false}
      />
    );
  }
}

export default RectTransformer;
