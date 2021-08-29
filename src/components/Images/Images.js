import React from 'react';
import { Image } from 'react-konva';

class AnnotationImage extends React.Component {
  state = {
    image: null,
  };

  componentDidMount() {
    const image = new window.Image();
    image.src = 'http://images.cocodataset.org/train2017/000000032907.jpg';
    image.onload = () => {
      this.setState({
        image,
      });
    };
  }

  render() {
    const {
      state: { image },
    } = this;
    return (
      <Image
        height={640}
        width={994}
        image={image}
      />
    );
  }
}

export default AnnotationImage;
