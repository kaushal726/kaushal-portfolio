import React from "react";
import Cards from "./Cards";
import dataStore from "../../db/dataStore"
import { Element } from 'react-scroll';

const Project = () => {
    return (
        <Element name="Project">
            <div className="h-full">
                <div className=" p-3 grid grid-cols-1 m-2 gap-2 md:grid-cols-4 h-full">
                    {dataStore.map((data, i) => {
                        return (
                            <Cards key={i} Heading={data.name} Paragraph={data.description} src={data.src} href={data.link} />
                        )
                    })}
                </div>
            </div>

        </Element>
    )



}
export default Project