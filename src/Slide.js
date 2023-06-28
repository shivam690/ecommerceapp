
import { Link } from "react-router-dom";
import "./Slide.css"; 

const Slide = ({ image }) => {
  return (
    <div
      className="slide"
      style={{ backgroundImage: `url(${image.src})` }}
      key={image.id}
    >
      <div className="slide-content">
        <h1 className="slide-headline">{image.headline}</h1>
        <p className="slide-body">{image.body}</p>
       
      </div>
    </div>
  );
};

export default Slide;
