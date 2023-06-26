import React from "react";
import Cards from "./cards";
import dataStore from "../db/dataStore"
function About() {
    return (
        <div className=" p-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            {dataStore.map((data, i) => {
                return (
                    <Cards key={i} Heading={data.name} Paragraph={data.description} src={data.src} href={data.link} />
                )
            })}
        </div>
    )

}
export default About