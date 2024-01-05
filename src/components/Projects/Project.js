import React from "react";
import Cards from "./Cards";
import dataStore from "../../db/dataStore"

const Project = () => {
    return (
        <div className="p-3 grid grid-cols-1 gap-2 md:grid-cols-2 place-items-center">
            {dataStore.map((data, i) => (
                <Cards key={i} Heading={data.name} Paragraph={data.description} src={data.src} href={data.link} />
            ))}
        </div>

    )



}
export default Project