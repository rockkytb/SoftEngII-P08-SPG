import React from 'react';
import { Carousel,  Button } from 'react-bootstrap';
import { useState } from 'react';
import  sfondo_cibo  from './immagini/sfondo_cibo.jpg';
import  cibo2 from './immagini/cibo2.jpg';
import  cibo3 from './immagini/cibo3.jpg';
import { Link } from "react-router-dom";


function CarouselCustom(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block width100"
          width="100vh"
          height="720px"
          src={cibo3}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Inizia i tuoi acquisti </h3>
          <Link to="/login"> <Button> Login </Button> </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block width100"
          width="100vh"
          height="720px"
          src={cibo2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Join us!</h3>
         <Link to="/register"> <Button> Sign up </Button> </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block width100"
          width="100vh"
          height="720px"
          src={sfondo_cibo}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Guarda i prodotti lurido</h3>
          <p>
            pulsante prodotti
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselCustom;