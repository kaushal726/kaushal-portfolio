import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
let Contact = () => {
    const form = useRef();
    let [data, setData] = useState({
        name: "",
        email: "",
        message: "",
    });

    useEffect(() => {

    }, [data])


    let handleSubmit = (event) => {
        event.preventDefault();
        let obj = {
            name: event.target.user_name.value,
            email: event.target.user_email.value,
            message: event.target.user_message.value,
        }
        setData(obj);
        emailjs.sendForm('service_86joc1d', 'template_16sp5v4', form.current, 'Iq8MAMWZJQD1KCqT_')
            .then((result) => {
                console.log(result.text);
                event.target.reset()
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <div className='h-[calc(100vh-5rem)] w-full flex justify-center items-center flex-col  mt-20'>
            <div className="m-auto w-5/6 md:w-1/2 ">
                <h2 className="text-start text-white text-3xl font-semibold italic">Contact Us</h2>
                <form ref={form} className="flex flex-col justify-evenly h-full  items-center" onSubmit={handleSubmit}>
                    <input className="h-12 w-full my-2  rounded text-black font-semibold outline-none px-1 " name="user_name" type="text" placeholder="Enter Your Name" />
                    <input className="h-12 w-full my-2 rounded text-black font-semibold outline-none px-1 " name="user_email" type="email" placeholder="Enter Your Email" />
                    <textarea placeholder="Message" className="h-24 w-full my-2 rounded text-black font-semibold outline-none px-1" name="user_message" rows="6" cols="60"></textarea>
                    <button className=" text-black border-2 border-black hover:ease-linear  font-semibold w-22 px-3 mr-auto p-1 text-start bg-yellow-400 rounded hover:bg-transparent hover:text-yellow-300 hover:border-yellow-300 hover:border-2" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default Contact;