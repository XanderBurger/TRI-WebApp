"use client"
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import data from "../assets/data/facilityLocations.geojson"
import states from "../assets/data/gz_2010_us_040_00_5m.geojson"


export default function FacilityMap({setContent, setDescription}){
    
    const svgRef = useRef(null)

    const svgWidth = 860
    const svgHeight = 500
    let projection = d3.geoMercator().scale(800).center([-93.04423584210527, 38.66203010526314]) //lower 48
    //let projection = d3.geoMercator().scale(800).center([-154, 63]) //Alaska
    let [xMin, yMax] = projection([-125.000000,49.384358])
    let [xMax, yMin] = projection([-66.934570, 24.396308])
    
    const geoGenerator = d3.geoPath()
    .projection(projection)

    let totalScale = d3.scaleSqrt().domain([0, 200000000]).range([0, 30])

    useEffect (() => {

        setDescription("Locations of Facilities in the lower 48 that produce over 100,000 Ibs of waste in 2021.")

        setContent({
            T1: "Facility:",
            D1: "---",
            T2: "Amount Disposed:",
            D2: "---"})
        
        const svg = d3.select(svgRef.current);

        svg.selectAll("g")
        .data(states.features)
        .join("path")
        .attr("d", geoGenerator)
        .attr("fill", "#1F2420")
        .attr("stroke", "#161A17")

        svg.selectAll("g")
        .data(data.features.filter((d) => d.properties.Total > 100000))
        .join("circle")
            .attr("cx", d => projection(d.geometry.coordinates)[0])
            .attr("cy", d => projection(d.geometry.coordinates)[1])
            .attr("fill", "#CD29F6")
            .attr("stroke", "#CD29F6")
            .attr("fill-opacity", 0.25)
            .on("mouseover", (d, i) =>
            {
                setContent({
                    T1: "Facility:",
                    D1: i.properties.Name,
                    T2: "Amount Disposed:",
                    D2: `${Math.round(i.properties.Total).toLocaleString()} Ibs`})
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
                
                setContent({
                    T1: "Facility:",
                    D1: "---",
                    T2: "Amount Disposed:",
                    D2: "---"})
            })
            .attr("r", 0)
            .transition()
            .duration(1000)
            .attr("r", d => totalScale(d.properties.Total))
    }, [])

    return <svg ref={svgRef} viewBox={`0, 0, ${svgWidth}, ${svgHeight}`} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"/>
}

