// import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import leftArrow from "../assets/Social Icons/left-arrow.jpg"
import rightArrow from "../assets/Social Icons/right-arrow.jpg"

let CarouselComponent = () => {


    return (
        <Carousel autoPlay={true} infiniteLoop={true} showArrows={false} showStatus={false} width={100}>
            <div>
                <img className="carousel-image" src={leftArrow} alt="" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img className="carousel-image" src={rightArrow} alt="" />
                <p className="legend">Legend 2</p>
            </div>
        </Carousel>
    )
}
export default CarouselComponent