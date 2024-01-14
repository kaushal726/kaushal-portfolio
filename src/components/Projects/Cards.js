import React from "react";
import "./Card.css";
import Tilt from 'react-parallax-tilt';
import { motion } from "framer-motion";

const cardVariants = {
    offscreen: {
        y: 300
    },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

function Card(props) {
    let hueA = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
    let hueB = Math.floor(Math.random() * (100 - 0 + 1)) + 0;

    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

    return (
        <Tilt tiltAngleXInitial={10} tiltAngleYInitial={10}>
            <motion.div
                className="card-container p-14 md:pd-28 shadow-2xl "
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
            >
                <div className="splash" style={{ background }} />
                <motion.div className="card parallax-effect" variants={cardVariants}>
                    <div className="flex inner-element flex-col items-center justify-center p-2">
                        <img alt="" className=" w-44 md:w-56" src={props.src} />
                        <a target="_blank" rel="noreferrer" className="text-lg text-black font-semibold italic text-center" href={props.href}>{props.heading}</a>
                        <p className=" rounded text-center text-sm text-black font-light ">{props.paragraph}</p>
                    </div>
                </motion.div>
            </motion.div>
        </Tilt >
    );
}

export default Card
