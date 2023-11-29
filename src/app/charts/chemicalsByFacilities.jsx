"use client"
import * as d3 from "d3";
import { useEffect, useRef, useState} from "react";
import data from '../assets/data/facilityTotals.json';

const facilityTotalsTop = data.sort((a,b) => {return b.Total - a.Total}).slice(0,25)


export default function ChemicalsByFacilities({setContent, setDescription}) {

    useEffect(() => {
        // Function to update the state based on screen width
        let newWidth = window.innerWidth > 768 ? 1000: 625
        let centerPosition = window.innerWidth > 768 ? 2: 2
        setSvgWidth(newWidth)
        setCenterX(newWidth/2)

        const handleResize = () => {
          let newWidth = window.innerWidth > 768 ? 1000: 625
          let centerPosition = window.innerWidth > 768 ? 2 : 2

          setSvgWidth(newWidth)
          setCenterX(newWidth/2)
        };
    
        // Add event listener
        window.addEventListener('resize', handleResize);
    
        // Cleanup function to remove the event listener
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    const [currFacility, setCurrFacility] = useState(facilityTotalsTop[0].Facility)
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentText, setCurrentText] = useState(facilityTotalsTop[0].Facility)

    const svgRef = useRef(null)
    const [svgWidth, setSvgWidth] = useState(1000)
    const [centerX, setCenterX] = useState(svgWidth/2)
    const svgHeight = 600
    const rScale = d3.scaleLog([1, facilityTotalsTop[0].Total], [0, (svgHeight/2) -10])
    const scaleValues =[1, 10,100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 10000000]


    function setColor(value, curr){
        if(value == curr.Air){return "#FF9F0E"}
        else if(value == curr.Water){return "#0EF1FF"}
        else if(value == curr.Landfill){return "#cd29f6"}
        else if(value == curr.Underground_Wells){return "#ff4e17"}
        else if(value == curr.Land_Treatment){return "#ff246d"}
        else if(value == curr.Surface_Impoundment){return "#3e30f9"}
        else return "none"
    }
    
    function FacilityButton({name, facility, setCurrFacility, current}){
        const selectedStyle = "rounded-xl bg-warm-white font-satoshi text-[10px] m-2 p-2 text-gray-green font-[800]"
        const unSelectedStyle = "rounded-xl bg-gray-green font-satoshi text-[10px] m-2 p-2 text-warm-white font-[800] hover:bg-warm-white hover:text-gray-green" 
      
        let style = facility === current? selectedStyle: unSelectedStyle
      
        return(
          <button className={style} onClick={() => {setCurrFacility(facility); setCurrentText(name); setShowDropdown(false)}}>{name}</button>
        )
    }

    const buttons = <div className="grid grid-cols-1 rounded-xl absolute mt-2 z-10 overflow-y-scroll h-[400px] max-w-[310px] bg-gray-green">
            {facilityTotalsTop.map((element) => <FacilityButton name={element.Facility} facility={element.Facility} setCurrFacility={setCurrFacility} current={currFacility} key={element.Facility}/> )}
        </div> 
  
    useEffect (() => {

        setDescription("Shows what methods the most polluting facilities are using to get rid of waste.")
        const currentData = facilityTotalsTop.filter((element) => element.Facility == currFacility)

        setContent({
            T1: "Facility:",
            D1: currentData[0].Facility,
            T2: "Amount Disposed:",
            D2: "---"})

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        
        

        svg.selectAll("g")
        .data(scaleValues)
        .join("line")
            .attr("x1", centerX)
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
            .attr("font-size", "18px")
            .text(d => `${d.toLocaleString()} Ibs`)
            .attr("transform", `translate(0, ${svgHeight/2})`)

        svg.selectAll("g")
            .data(scaleValues)
            .join("circle")
                .attr("cx", centerX)
                .attr("cy", svgHeight/2)
                .attr("fill", "none")
                .attr("r", d => rScale(d))
                .attr("stroke", "#1F2420")
                .attr("stroke-width", 2)

        Object.values(currentData[0]).forEach(element => {
            if (element <= 1) {return}
            if (setColor(element, currentData[0]) == "none") {return}

            svg.append("circle")
                .attr("cx", centerX)
                .attr('cy', svgHeight/2)
                .attr("fill", "none")
                .transition()
                .attr("r", rScale(element))
                .attr("stroke", setColor(element, currentData[0]))
                .attr("stroke-width", 2)

            svg.append("circle")
                .attr("cx", centerX)
                .attr('cy', svgHeight/2 + rScale(element))
                .attr("fill", "#161A17")
                .attr("stroke", setColor(element, currentData[0]))
                .attr("stroke-width", 2)
                .on("mouseover", (event) => {
                    setContent({
                        T1: "Facility:",
                        D1: currentData[0].Facility,
                        T2: "Amount Disposed:",
                        D2: `${Math.round(element).toLocaleString()} Ibs`})
                    d3.select(event.target).attr("fill", setColor(element, currentData[0]))})
                .on("mouseout", (event) => {
                    setContent({
                        T1: "Facility:",
                        D1: currentData[0].Facility,
                        T2: "Amount Disposed:",
                        D2: "---"})
                        d3.select(event.target).attr("fill", "#161A17")})
                .transition()
                .attr("r", 10)
            
        });
                
    }, [currFacility, centerX])

    return (
        <div className="grid auto-rows-min gap-y-4"> 
            <div className="">
               <div onClick={() => setShowDropdown(!showDropdown)} className="rounded-xl bg-gray-green text-warm-white p-4">
                    {currentText}
                </div>
                    {showDropdown && buttons}
                </div>

            <div className=" m-h-[200px]">
                <svg ref={svgRef} viewBox={`0, 0, ${svgWidth}, ${svgHeight}`} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"/>
            </div>
            
        </div>
    )   
}
