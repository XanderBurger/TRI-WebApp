"use client"
import React, { useState, useEffect } from 'react'
import {useSpring, animated} from "react-spring"

export default function Card({color, show, setIsShow, handleShow, i, content, height, totalWidth, cardNumber,title}) {
    
    const[showContent, setShowContent] = useState(show)

    const margin = 10
    const maxWidth = totalWidth/1.8
    const minWidth = ((totalWidth - maxWidth) - (margin))/ cardNumber
    console.log(minWidth)
    const animatedDiv = useSpring(  
        {
            width: show ? maxWidth: minWidth,
            display: "flex",
            height: height,
            float: "right",
            backgroundColor: "#1F2420",
            boxSizing: "border-box",
            zIndex:"2",
            onRest: () => setShowContent(show ? true: false)
        }
    )
    

    return (
        <>
        <animated.div className='rounded-3xl mr-[10px] mt-[10px]' style={animatedDiv} onClick={() => (setIsShow(handleShow(i)))}>
            <animated.h2 className="font-[500] text-[30px] pl-[1px] pt-4 uppercase" style={{color: color, writingMode: "vertical-rl"}}>{title}</animated.h2>
            {showContent && show && content} 
        </animated.div>
        </>
    )
}