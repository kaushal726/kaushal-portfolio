import React from "react";
function Cards(props) {
    return (
        <div className="bg-slate-200 shadow-md rounded-lg p-4 ">
            <h1 className="text-xl font-bold mb-2" >{props.Heading}</h1>
            <p className="text-gray-700 mb-4" >{props.Paragraph}</p>
            <img className="w-full rounded-lg" src={props.src} alt="" />
        </div>
    )
}
export default Cards