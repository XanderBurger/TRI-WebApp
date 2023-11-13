"use client"
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import data from '../assets/data/productionRatio.json';



export default function ProductionRatios({setContent, setKey, setDescription}) {
    const svgRef = useRef(null)
    const svgWidth = 800
    const svgHeight = 600

    setDescription("This is a description for the Production Ratio chart")

    const scaleValues =[50000000, ,100000000, 500000000, 1000000000]
    const sortedData = data.sort((a,b) => {return b.Amount2 - a.Amount2}).slice(0,100)

    const yScale = d3.scaleLog([400000, d3.max(data, d => d.Amount1)], [svgHeight, 0])
    const colorScale = d3.scaleLinear([0.5, 1.3], ["#16FF58","#FF2056"])

    useEffect (() => {
        const svg = d3.select(svgRef.current);
       

        // console.log( `M 10 ${yScale()} L ${(svgWidth - 10)} ${(d => yScale(data[0].Amount2))}`)
        // console.log(yScale(data[1].Amount1))

        // svg.selectAll("g")
        //     .data(data)
        //     .join("path")
        //         .attr("fill", "none")
        //         .attr("stroke", "white")
        //         .attr("stroke-width", 2)
        //         .attr("d", `M 10 ${amount} L ${(svgWidth - 10)} ${(d => yScale(d.Amount2))}`)

        // svg.selectAll("g")
        // .data(scaleValues)
        // .join("line")
        //     .attr("x1", 0)
        //     .attr("x2", svgWidth)
        //     .attr("y1", d => (yScale(d)))
        //     .attr("y2", d => (yScale(d)))
        //     .attr("stroke", "#1F2420")
        //     .attr("stroke-width", 1)
        //     .attr("transform", `translate(0, ${svgHeight/2})`)

        // svg.selectAll("g")
        // .data(scaleValues)
        // .join("text")
        //     .attr("x", svgWidth)
        //     .attr("y", d => (yScale(d) - 2))
        //     .attr("fill", "#1F2420")
        //     .attr("text-anchor", "end")
        //     .text(d => `${d.toLocaleString()} Ibs`)
        //     .attr("transform", `translate(0, ${svgHeight/2})`)

        const strokeColors = ["#0EF1FF", "#16FF58", "#FF9F0E", "#CD29F6", "#FF2056"]
        let currColor = 0
        sortedData.forEach(element => {
            const startY = yScale(element.Amount1)
            const endY = yScale(element.Amount2)

            svg.append("path")
                .attr("fill", "none")
                .attr("stroke-width", 5)
                .attr("stroke-opacity", 0.1)
                .attr("stroke-linecap", "round")
                .attr("stroke", colorScale(1))
                .attr("d", `M 50 ${startY} L ${(svgWidth - 50)} ${startY}`)
                .on("mouseover", (event) => {
                    setContent(`Chemical: ${element.Chemical} Amount: ${Math.round(element.Amount2 - element.Amount1).toLocaleString()} Ibs`)
                    d3.select(event.target).attr("stroke-opacity", 1)
                })
                .on("mouseout", (event) => {
                    d3.select(event.target).attr("stroke-opacity", .1)
                })
                .transition()
                .duration(2000)
                .attr("stroke", colorScale(element.Amount2/element.Amount1))
                .attr("d", `M 50 ${startY} L ${(svgWidth - 50)} ${endY}`)
            
            currColor = (currColor + 1) % strokeColors.length 
        });
        
        setKey("Ratios")
                
    }, [])

    return <svg ref={svgRef} viewBox={`0, 0, ${svgWidth}, ${svgHeight}`} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"/>
}

