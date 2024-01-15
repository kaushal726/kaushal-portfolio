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

function Card(props) {
    return (
        <Tilt tiltAngleXInitial={10} tiltAngleYInitial={10}>
            <motion.div
                className="card-container h-full p-14 md:pd-28 shadow-2xl "
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
            >
                <div className="splash" style={{ backgroundColor: "#dbfc03" }} />
                <motion.div className="card parallax-effect" variants={cardVariants}>
                    <div className="flex inner-element flex-col items-center justify-between h-full p-2">
                        <a target="_blank" rel="noreferrer" className="text-xl  text-black font-semibold italic text-start border-b-4 border-black w-full " href={props.href}>{props.heading}</a>
                        <p className="w-full font-serif text-start rounded my-2 text-sm text-black font-light ">{props.paragraph}</p>
                        <div className="p-2 bg-white rounded-xl border-2 ">
                            <img alt="" className=" w-44 md:w-56" src={props.src} />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </Tilt >
    );
}

export default Card
