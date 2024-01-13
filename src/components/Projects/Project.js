import React from "react";
import Card from "./Cards";
import dataStore from "../../db/dataStore";



const Project = () => {
    return (
        <div className="mt-16 bg-transparent grid grid-cols-1 gap-2 md:grid-cols-2 place-items-center  p-3 h-full pb-36 max-w-full ">
            {dataStore.map((data, i) => (
                <Card key={i} heading={data.name} paragraph={data.description} src={data.src} href={data.link} />
            ))}
        </div>
    );
};

export default Project;

//grid grid-cols-1 gap-2 md:grid-cols-2 place-items-center
// flex justify-center items-center flex-col