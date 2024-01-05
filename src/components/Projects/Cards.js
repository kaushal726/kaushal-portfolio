import React from "react";
function Cards(props) {
    return (
        <a href={props.href} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={props.src} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.Heading}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.Paragraph}</p>
            </div>
        </a>

    )
}
export default Cards