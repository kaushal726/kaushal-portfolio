import React from "react";
import Cards from "./cards";
import dataStore from "../db/dataStore"
import { Element } from 'react-scroll';

function About() {
    return (
        <Element name="Project">
            <div className=" p-3 grid grid-cols-1 m-2 gap-2 md:grid-cols-4">
                {dataStore.map((data, i) => {
                    return (
                        <Cards key={i} Heading={data.name} Paragraph={data.description} src={data.src} href={data.link} />
                    )
                })}
            </div>
        </Element>
    )



}
export default About