"use client"
import * as d3 from "d3";
import { useEffect, useRef} from "react";
import data from '../assets/data/GroupedByDisposalType.json';

export default function ChemicalTreemap({setContent, setDescription}) {
    const svgRef = useRef(null)
    const svgWidth = 1120
    const svgHeight = 730

    useEffect (() => {

        setDescription("Amount of chemicals disposed organized by disposal type. ")
        setContent({
            T1: "Chemical:",
            D1: "---",
            T2: "Amount:",
            D2: "---"})

        const svg = d3.select(svgRef.current);

        const nestedData = d3.hierarchy(d3.group(data, d=> d.DisposalType, d => d.Chemical)).sum(d => d.Amount).sort(d => d.value)
        
        let createTreeMap = d3.treemap()
                                .size([svgWidth, svgHeight])

        createTreeMap(nestedData)

        const dataTiles = nestedData.leaves()

        let block = svg.selectAll("g")
            .data(dataTiles)
            .enter()
            .append("g")
            .attr("transform", d => `translate(${d.x0}, ${d.y0})`)
    
        block.append("rect")
            .attr("class", "title")
            .attr("fill", d => {
                if(d.data.DisposalType === "Recycled") {return "#16FF58"}
                else if(d.data.DisposalType === "Landfill") {return "#cd29f6"}
                else if(d.data.DisposalType === "Underground Wells") {return "#ff4e17"}
                else if(d.data.DisposalType === "Air") {return "#FF9F0E"}
                else if(d.data.DisposalType === "Water") {return "#0EF1FF"}
                else if(d.data.DisposalType === "Land Treatment") {return "#ff246d"}
                else if(d.data.DisposalType === "Surface Impoundment") {return "#3e30f9"}
                } )
            .attr("fill-opacity", .25)
            .attr("stroke", d => {
                return "#cd29f6"
                // if(d.data.DisposalType === "Recycled") {return "#16FF58"}
                // else if(d.data.DisposalType === "Landfill") {return "#20ffa6"}
                // else if(d.data.DisposalType === "Underground Wells") {return "#CD29F6"}
                // else if(d.data.DisposalType === "Air") {return "#FF9F0E"}
                // else if(d.data.DisposalType === "Water") {return "#0EF1FF"}
                // else if(d.data.DisposalType === "Land Treatment") {return "#FF2056"}
                // else if(d.data.DisposalType === "Surface Impoundment") {return "#ff20b8"}
                } )
            .attr("stroke-width", 1)
            .transition()
            .duration(1000)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)

            block
            .on("mouseover", (d, i) =>
            {
                setContent({
                    T1: "Chemical:",
                    D1: i.data.Chemical,
                    T2: "Amount:",
                    D2: `${Math.round(i.data.Amount).toLocaleString()} Ibs`})

                d3.select(d.target)
                .transition()
                .duration(200)
                .attr("fill-opacity", 1)
            })
            .on("mouseout",  (d, i) => {
               
                setContent({
                    T1: "Chemical:",
                    D1: "---",
                    T2: "Amount:",
                    D2: "---"})

                d3.select(d.target)
                .transition()
                .duration(200)
                .attr("fill-opacity", 0.25)                
            })  
    }, [])

    return <svg ref={svgRef} viewBox={`0, 0, ${svgWidth}, ${svgHeight}`} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"/>
}

