import React from 'react';
import { Image } from 'react-konva';

class AnnotationImage extends React.Component {
  state = {
    image: null,
  };

  componentDidMount() {
    const image = new window.Image();
    const images = [
      "http://images.cocodataset.org/train2017/000000032907.jpg",
      "http://images.cocodataset.org/train2017/000000549399.jpg",
      "http://images.cocodataset.org/train2017/000000510755.jpg",
      "http://images.cocodataset.org/train2017/000000111076.jpg",
      "http://images.cocodataset.org/train2017/000000455483.jpg"
    ]

    image.src =  images[this.props.index];
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
