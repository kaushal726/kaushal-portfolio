import React, { useState } from "react";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
let Contact = () => {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [summary, setSummary] = useState("");
    let [popUp, setpopUp] = useState(false);
    let [details, setdetails] = useState([]);
    let [message, setMessage] = useState("");



    let updateName = (e) => {
        setName(e.target.value);
        setdetails(oldArray => [...oldArray, "name"]);
    }
    let updateEmail = (e) => {
        setEmail(e.target.value);
        setdetails(oldArray => [...oldArray, "email"]);
    }
    let updateSummary = (e) => {
        setSummary(e.target.value);
    }
    let upload = (event) => {
        event.preventDefault();
        setName("");
        setEmail("");
        setSummary("");
        console.log(details);
        setpopUp(true);
        if (details.includes("name") && details.includes("email")) {
            setMessage("Successfully Submitted ! ");
        }
        else if (details.includes("email")) {
            setMessage("Enter your Name");
        }
        else if (details.includes("name")) {
            setMessage("Enter your Email");
        }
        else {
            setMessage("Enter your Details");
        }
        disableBodyScroll(document.body);
    }
    const handleDismiss = () => {
        setpopUp(false);
        enableBodyScroll(document.body);
        setMessage("");
        setdetails([])
        // Perform any desired changes in the website here
    };
    return (
        <div className="p-5 bg-white m-5 rounded-lg">
            <h2 className="text-center text-3xl font-semibold italic">Contact Us</h2>
            <form className=" grid grid-rows-3">
                <label className="block text-gray-700 font-bold mt-2" htmlFor="name" >Name : </label>
                <input className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" id="name" type="text" placeholder="Enter Your Name" onChange={updateName} value={name} />
                <label className="block text-gray-700 font-bold mt-2" htmlFor="email" >Email : </label>
                <input className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" id="email" type="email" placeholder="Enter Your Email" onChange={updateEmail} value={email} />
                <label className="block text-gray-700 font-bold mt-2" htmlFor="message" >Suggestions  : </label>
                <textarea className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight resize-none h-24 focus:outline-none focus:border-blue-500" id="message" name="w3review" rows="6" cols="60" onChange={updateSummary} value={summary}></textarea>
                <button className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 mt-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={upload}>Submit</button>
            </form>
            {popUp && (
                <div className="z-40 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col bg-white p-4 rounded-lg">
                        <div className="flex items-end justify-end">
                            <button className="mb-4 text-gray-600 hover:text-gray-900" onClick={handleDismiss}>
                                <i className="fa-solid fa-xmark fa-beat"></i>
                            </button>
                        </div>
                        <h2 className="text-2xl italic font-bold mb-4">{message}</h2>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Contact;