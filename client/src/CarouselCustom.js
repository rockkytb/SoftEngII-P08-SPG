import { Carousel } from 'react-bootstrap';
import { useState } from 'react';
import  sfondo_cibo  from './immagini/sfondo_cibo.jpg';


function CarouselCustom(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Inzia i tuoi acquisti </h3>
          <p>pulsante login</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Sei nuovo?</h3>
          <p>pulsante registrati</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={sfondo_cibo}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Guarda i prodotti disponibili</h3>
          <p>
            pulsante prodotti
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselCustom;