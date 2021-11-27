import React, { useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import styled from 'styled-components';

const Button = styled.div` 
   position: fixed;  
   left: 50%; 
   bottom: 0;
   font-size: 3rem; 
   z-index: 1; 
   cursor: pointer; 
   color: white; 
`

const ScrollButton = () => {

    const [visible, setVisible] = useState(true)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 0) {
            setVisible(false)
        }
        else if (scrolled <= 0) {
            setVisible(true)
        }
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            // top: 1500,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Button>
            <FaArrowCircleDown onClick={scrollToBottom}
                style={{ display: visible ? 'inline' : 'none' }} />
        </Button>
    );
}

export default ScrollButton;