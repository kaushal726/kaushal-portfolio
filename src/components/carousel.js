import React, { useEffect, useState } from "react";
import leftArrow from "../assets/Social Icons/left-arrow.png"
import rightArrow from "../assets/Social Icons/right-arrow.png"

let Carousel = () => {
    let imgSrcArray = [leftArrow, rightArrow];
    let [arrIndex, arrIndexFn] = useState(0);
    let [imageSrc, imageSrcFn] = useState([imgSrcArray[arrIndex]]);
    useEffect(() => {
        let interval = setInterval(function () {
            if (imgSrcArray.length - 1 === arrIndex) {
                arrIndexFn(0);
            }
            else {
                arrIndexFn(arrIndex + 1);
            }
            imageSrcFn(imgSrcArray[arrIndex]);
        }, 3000);
        return () => {
            clearInterval(interval);
        };
    }, [arrIndex])

    // let leftButton = () => {
    //     if (arrIndex === 0) {
    //         arrIndexFn(0);
    //         imageSrcFn([imgSrcArray[arrIndex]]);
    //     }
    //     else {
    //         arrIndexFn(arrIndex - 1);
    //         imageSrcFn([imgSrcArray[arrIndex]]);
    //     }
    // }

    // const rightButton = () => {
    //     if (imgSrcArray.length - 1 === arrIndex) {
    //         arrIndexFn(imgSrcArray.length - 1);
    //         imageSrcFn([imgSrcArray[arrIndex]]);
    //     }
    //     else {
    //         arrIndexFn(arrIndex + 1);
    //         imageSrcFn([imgSrcArray[arrIndex]]);
    //     }
    // }

    return (
        <div className=" relative">
            <img className='w-full h-96 animate-pulse animate-delay-3000' src={imageSrc} alt="" />
            <div className="absolute inset-0 flex items-center">
                <h1 className="text-white text-lg text-center">Sample Text</h1>
            </div>
        </div >
    )
}
export default Carousel