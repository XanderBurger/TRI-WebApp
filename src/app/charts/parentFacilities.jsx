"use client"
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import data from "../assets/data/facilitiesAndParents.json"

const dataByParents = d3.groups(data, d => d.Parent_Co)
const dataByParentsSum = []

dataByParents.map((p,i) => dataByParentsSum.push([p, d3.sum(dataByParents[i][1], d => d.On_Site_Release) , d3.rollups(dataByParents[i][1], v => d3.sum(v,v => v.On_Site_Release), d => d.Facility)]))
dataByParentsSum.sort((a,b) => {return b[1] - a[1]})

const topData = dataByParentsSum.slice(0,50)

function ParentButton({name, parentIndex, setCurrParent, currentIndex}){
    const selectedStyle = "rounded-xl bg-warm-white font-satoshi text-[10px] m-2 p-2 text-gray-green font-[800]"
    const unSelectedStyle = "rounded-xl bg-gray-green font-satoshi text-[10px] m-2 p-2 text-warm-white font-[800] hover:bg-warm-white hover:text-gray-green" 
    
    let style = parentIndex === currentIndex? selectedStyle: unSelectedStyle

    return(
        <button className={style} onClick={() => {setCurrParent(parentIndex)}}>{name}</button>
    )
}

export default function ParentsFacilities({setContent, setKey, setDescription}){
    
    const svgRef = useRef(null)

    const scaleValues =[1, 10,100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 10000000, 100000]

    const svgWidth = 1000
    const svgHeight = 600

    const lineScale = d3.scaleLog([1, topData[0][1]], [0, svgHeight/2])
    const xAxis = d3.scaleBand().domain(topData.map((d) => d[0])).rangeRound([0,svgWidth])

    const centerX = svgWidth/2
    const centerY = svgHeight/2

    const [currParent, setCurrParent] = useState(0)

    
    

    useEffect (() => {
        
        setDescription("This is a description for the Parent Facility chart")

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("fill", "#CD29F6")
        .attr("r", 5)
        
        svg.selectAll("g")
            .data(scaleValues)
            .join("circle")
                .attr("cx", centerX)
                .attr("cy", centerY)
                .attr("fill", "none")
                .attr("r", d => lineScale(d))
                .attr("stroke", "#1F2420")
                .attr("stroke-width", 2)

        let rotationAmount = 360/topData[currParent][2].length
        let rotation = 90
        topData[currParent][2].forEach(e => {
            svg.append("path")
            .attr("transform", `rotate(${rotation}, ${centerX}, ${centerY})`)
            .attr("stroke", "#CD29F6")
            .attr("d", `M ${centerX} ${centerY} v 0`)
            .attr("stroke-width", 1)
            .transition()
            .attr("d", `M ${centerX} ${centerY} v${-lineScale(e[1])}`)

            svg.append("circle")
            .attr("cx", centerX)
            .attr("cy", (centerY) -lineScale(e[1]) )
            .attr("fill", "none")
            .attr("stroke", "#FF2056")
            .attr("fill", "#FF2056")
            .attr("fill-opacity", .25)
            .attr("stroke-width", 2)
            .on("mouseover", (event) => {
                setContent(`Amount: ${e[1]}`)
                d3.select(event.target).attr("fill-opacity", 1)
            })
            .on("mouseout", (event) => {
                d3.select(event.target).attr("fill-opacity", .25)
            })
            .attr("transform", `rotate(${rotation}, ${centerX}, ${centerY})`)
            .transition()
            .attr("r", 10)
        
            rotation += rotationAmount
        })

        
        
    }, [currParent])

    return(
        <div className="grid auto-rows-min gap-y-4"> 
            <div className="m-h-[300px]">
                <svg ref={svgRef} viewBox={`0, 0, ${svgWidth}, ${svgHeight}`} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"/>
            </div>
            <div>
               {topData.map((e, i) => <ParentButton name={e[0][0]} parentIndex={i} setCurrParent={setCurrParent} currentIndex={currParent} key={e[0][0]}/>)}
            </div>    
        </div>
    )
     
}

