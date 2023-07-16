import React from 'react';
import { animateScroll as scroll } from 'react-scroll';

const ScrollToTopButton = () => {
    const scrollToTop = () => {
        scroll.scrollToTop({
            smooth: true,
            duration: 500,
        });
    };

    return (
        <button onClick={scrollToTop} className="scroll-to-top text-white">
            Scroll to Top
        </button>
    );
};

export default ScrollToTopButton;
