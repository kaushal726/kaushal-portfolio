import React from "react";
function Cards(props) {
    return (
        <div className=" bg-zinc-600 shadow-md rounded-lg p-4 z-40 ">
            <h1 className="text-xl text-white text-center font-bold mb-2" >{props.Heading}</h1>
            <p className=" text-white mb-4 md:text-sm text-xs h-10" >{props.Paragraph}</p>
            <div className="text-center md:p-8 pb-2"><a className="text-center text-white" target="_blank" rel="noreferrer" href={props.href}>{props.Heading}</a></div>
            <img className="w-full rounded-lg" src={props.src} alt="" />
        </div>
    )
}
export default Cards