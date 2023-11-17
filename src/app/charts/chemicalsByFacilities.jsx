"use client"
import * as d3 from "d3";
import { useEffect, useRef, useState} from "react";
import data from '../assets/data/facilityTotals.json';

const facilityTotalsTop = data.sort((a,b) => {return b.Total - a.Total}).slice(0,25)

function FacilityButton({name, facility, setCurrFacility, current}){
    const selectedStyle = "rounded-xl bg-warm-white font-satoshi text-[10px] m-2 p-2 text-gray-green font-[800]"
    const unSelectedStyle = "rounded-xl bg-gray-green font-satoshi text-[10px] m-2 p-2 text-warm-white font-[800] hover:bg-warm-white hover:text-gray-green" 
  
    let style = facility === current? selectedStyle: unSelectedStyle
  
    return(
      <button className={style} onClick={() => {setCurrFacility(facility)}}>{name}</button>
    )
}


export default function ChemicalsByFacilities({setContent, setDescription}) {

    const [currFacility, setCurrFacility] = useState(facilityTotalsTop[0].Facility)
    const svgRef = useRef(null)
    const svgWidth = 600
    const svgHeight = 300
    const rScale = d3.scaleLog([1, facilityTotalsTop[0].Total], [0, (svgHeight/2) -10])
    const scaleValues =[1, 10,100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 10000000, 100000]


    function setColor(value, curr){
        if(value == curr.Air){return "#FF9F0E"}
        else if(value == curr.Water){return "#0EF1FF"}
        else if(value == curr.Landfill){return "#20ffa6"}
        else if(value == curr.Underground_Wells){return "#CD29F6"}
        else if(value == curr.Land_Treatment){return "#FF2056"}
        else if(value == curr.Surface_Impoundment){return "#ff20b8"}
    }   
  
    useEffect (() => {

        setDescription("Shows what methods the most polluting facilities are using to get rid of waste.")

        setContent({
            T1: "",
            D1: "---",
            T2: "",
            D2: "---"})

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        
        const currentData = facilityTotalsTop.filter((element) => element.Facility == currFacility)

        svg.selectAll("g")
        .data(scaleValues)
        .join("line")
            .attr("x1", svgWidth/4)
            .attr("x2", svgWidth)
            .attr("y1", d => (rScale(d)))
            .attr("y2", d => (rScale(d)))
            .attr("stroke", "#1F2420")
            .attr("stroke-width", 1)
            .attr("transform", `translate(0, ${svgHeight/2})`)

        svg.selectAll("g")
        .data(scaleValues)
        .join("text")
            .attr("x", svgWidth)
            .attr("y", d => (rScale(d) - 2))
            .attr("fill", "#1F2420")
            .attr("text-anchor", "end")
            .text(d => `${d.toLocaleString()} Ibs`)
            .attr("transform", `translate(0, ${svgHeight/2})`)

        Object.values(currentData[0]).forEach(element => {
            svg.append("circle")
                .attr("cx", svgWidth/4)
                .attr('cy', svgHeight/2)
                .attr("fill", "none")
                .transition()
                .attr("r", rScale(element))
                .attr("stroke", setColor(element, currentData[0]))
                .attr("stroke-width", 2)
        });
                
    }, [currFacility])

    return (
        <div className="grid auto-rows-min gap-y-4"> 
         
            <div className=" m-h-[200px]">
                <svg ref={svgRef} viewBox={`0, 0, ${svgWidth}, ${svgHeight}`} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"/>
            </div>
            <div>
               {facilityTotalsTop.map((element) => <FacilityButton name={element.Facility} facility={element.Facility} setCurrFacility={setCurrFacility} current={currFacility} key={element.Facility}/> )}
            </div> 
        </div>
    )   
}
