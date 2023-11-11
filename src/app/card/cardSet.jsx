"use client"

import Card from "./card";
import React, { useState } from 'react'


export default function CardSet({cardContent, width, height}) {

    let boolList = []
    cardContent.forEach(c => {boolList.push(false)});

    function handleShow(i){
        let newList = []
        cardContent.forEach(c => {boolList.push(false)});
        newList[i] = true
        return newList
    }

    boolList[boolList.length - 1] =  true
    const [isShow, setIsShow] = useState(boolList)
    

    return (
        <div className={"font-satoshi"} style={{width: `${width}px`}}>
            {cardContent.map((c, i) => <Card color={c.color} setIsShow={setIsShow} show={isShow[i]} handleShow={handleShow} i={i} content={c.content} title={c.title} height={height} cardNumber={cardContent.length} totalWidth ={width} key={c.title}/>)}
        </div>
    )
}
