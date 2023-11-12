"use client"
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import data from '../assets/data/GroupedByDisposalType.json';

export default function chemicalTreemap({setContent, setKey}) {
    const svgRef = useRef(null)
    const svgWidth = 1120
    const svgHeight = 600

    useEffect (() => {
        const svg = d3.select(svgRef.current);
        // const svg = svgEl.append("g")

        const nestedData = d3.hierarchy(d3.group(data, d=> d.DisposalType, d => d.Chemical)).sum(d => d.Amount).sort(d => d.value)
        
        let createTreeMap = d3.treemap()
                                .size([svgWidth, svgHeight])

        createTreeMap(nestedData)

        const dataTiles = nestedData.leaves()

        let block = svg.selectAll("g")
            .data(dataTiles)
            .enter()
            .append("g")
            // .attr("transform", d => `translate(${d.x0}, ${d.y0})`)
            .attr("transform", d => `translate(${d.x0}, ${d.y0})`)
    
        block.append("rect")
            .attr("class", "title")
            .attr("fill", d => {
                if(d.data.DisposalType === "Recycled") {return "#16FF58"}
                else if(d.data.DisposalType === "Landfill") {return "#b164bc"}
                else if(d.data.DisposalType === "Underground Wells") {return "#CD29F6"}
                else if(d.data.DisposalType === "Air") {return "#FF9F0E"}
                else if(d.data.DisposalType === "Water") {return "#0EF1FF"}
                else if(d.data.DisposalType === "Land Treatment") {return "#FF2056"}
                else if(d.data.DisposalType === "Surface Impoundment") {return "#febe04"}
                } )
            .attr("fill-opacity", .25)
            .attr("stroke", d => {
                if(d.data.DisposalType === "Recycled") {return "#16FF58"}
                else if(d.data.DisposalType === "Landfill") {return "#b164bc"}
                else if(d.data.DisposalType === "Underground Wells") {return "#CD29F6"}
                else if(d.data.DisposalType === "Air") {return "#FF9F0E"}
                else if(d.data.DisposalType === "Water") {return "#0EF1FF"}
                else if(d.data.DisposalType === "Land Treatment") {return "#FF2056"}
                else if(d.data.DisposalType === "Surface Impoundment") {return "#febe04"}
                } )
            .attr("stroke-width", "2px")
            .transition()
            .duration(1000)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)

            block
            .on("mouseover", (d, i) =>
            {
                setContent(`${i.data.DisposalType}: ${i.data.Chemical}: ${Math.round(i.data.Amount).toLocaleString()} Ibs`)
                d3.select(d.target)
                .transition()
                .duration(200)
                .attr("fill-opacity", 1)
            })
            .on("mouseout",  (d, i) => {
            d3.select(d.target)
            .transition()
            .duration(200)
            .attr("fill-opacity", 0.25)                
            })

            setKey("TreeMap")
                
    }, [])

    return <svg ref={svgRef} viewBox={`0, 0, ${svgWidth}, ${svgHeight}`} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"/>
}

