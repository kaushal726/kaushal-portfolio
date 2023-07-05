import React, { useState } from "react";
let Contact = () => {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [summary, setSummary] = useState("");


    let updateName = (e) => {
        setName(e.target.value);
    }
    let updateEmail = (e) => {
        setEmail(e.target.value);
    }
    let updateSummary = (e) => {
        setSummary(e.target.value);
    }
    let upload = (event) => {
        event.preventDefault();
        setName("");
        setEmail("");
        setSummary("");
        console.log(name, email, summary);
    }

    return (
        <div className="w-full bg-slate-600 p-10">e
            <h2 className="text-center">Contact Us</h2>
            <form className="grid grid-rows-3">
                <label className="">Name : </label>
                <input type="text" placeholder="Enter Your Name" onChange={updateName} value={name} />
                <label className="">Email : </label>
                <input type="email" placeholder="Enter Your Email" onChange={updateEmail} value={email} />
                <label className="">Suggestions  : </label>
                <textarea id="w3review" name="w3review" rows="6" cols="60" onChange={updateSummary} value={summary}></textarea>
                <button type="submit" onClick={upload}>Submit</button>
            </form>
        </div>
    )
}
export default Contact;