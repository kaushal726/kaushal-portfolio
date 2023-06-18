import React from "react";
import Cards from "./cards";
function About() {
    return (
        <div className=" p-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            <Cards Heading="Heading" Paragraph="dddddd" src="https://picsum.photos/200/300?grayscale" />
            <Cards Heading="Heading" Paragraph="dddddd" src="https://picsum.photos/200/300?grayscale" />
            <Cards Heading="Heading" Paragraph="dddddd" src="https://picsum.photos/200/300?grayscale" />
            <Cards Heading="Heading" Paragraph="dddddd" src="https://picsum.photos/200/300?grayscale" />
            <Cards Heading="Heading" Paragraph="dddddd" src="https://picsum.photos/200/300?grayscale" />
            <Cards Heading="Heading" Paragraph="dddddd" src="https://picsum.photos/200/300?grayscale" />
            <Cards Heading="Heading" Paragraph="dddddd" src="https://picsum.photos/200/300?grayscale" />
        </div>
    )

}
export default About