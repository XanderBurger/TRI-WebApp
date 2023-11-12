"use client"
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import data from "../assets/data/facilitiesAndParents.json"

export default function FacilityMap({setContent, setKey}){
    
    const svgRef = useRef(null)

    const svgWidth = 860
    const svgHeight = 600
   
    const dataByParents = d3.groups(data, d => d.Parent_Co)
    const dataByParentsSum = []
    dataByParents.map((p,i) => dataByParentsSum.push([p, d3.sum(dataByParents[i][1], d => d.On_Site_Release) , d3.rollups(dataByParents[i][1], v => d3.sum(v,v => v.On_Site_Release), d => d.Facility)]))
    dataByParentsSum.sort((a,b) => {return b[1] - a[1]})

    const lineScale = d3.scaleLog([1, dataByParentsSum[0][1]], [0, svgWidth/2])
    const yAxis = d3.scaleBand().domain(data.map((d) => d[0])).rangeRound([svgHeight,0])
    

    const testData = dataByParentsSum[4]
    // console.log(dataByParentsSum)
    // console.log(dataByParents.get("3M CO"))
    console.log(lineScale(testData[1]))
    // console.log(testData[1])

    // console.log(dataByParentsSum[0][1])

    useEffect (() => {
        
        const svg = d3.select(svgRef.current);
        
        svg.selectAll(".lines")
        .data(testData)
        .join("g")
            .append("path")
            .attr("d", `M 0 0 h${lineScale(testData[1])}`)
            .attr("stroke", "white")
            .attr("stroke-width", 2)
           
        svg.selectAll(".lines")
            .data(testData)
            .join("g")
            .append("path")
            .attr("d", `M${lineScale(testData[1])} 0 v20`)
            .attr("stroke", "white")
            .attr("stroke-width", 2)

            

        
    }, [])

    return <svg ref={svgRef} viewBox={`0, 0, ${svgWidth}, ${svgHeight}`} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"/>
}

