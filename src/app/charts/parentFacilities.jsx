"use client"
import * as d3 from "d3";
import { useEffect, useRef, useState} from "react";
import data from "../assets/data/facilitiesAndParents.json"

const dataByParents = d3.groups(data, d => d.Parent_Co)
const dataByParentsSum = []

dataByParents.map((p,i) => dataByParentsSum.push([p, d3.sum(dataByParents[i][1], d => d.On_Site_Release) , d3.rollups(dataByParents[i][1], v => d3.sum(v,v => v.On_Site_Release), d => d.Facility)]))
dataByParentsSum.sort((a,b) => {return b[1] - a[1]})

const topData = dataByParentsSum.slice(0,50)



export default function ParentsFacilities({setContent, setDescription}){

    useEffect(() => {
        // Function to update the state based on screen width
        let newWidth = window.innerWidth > 768 ? 1000: 625
        setSvgWidth(newWidth)
        setCenterX(newWidth/2)

        const handleResize = () => {
          let newWidth = window.innerWidth > 768 ? 1000: 625
          setSvgWidth(newWidth)
          setCenterX(newWidth/2)
        };
    
        // Add event listener
        window.addEventListener('resize', handleResize);
    
        // Cleanup function to remove the event listener
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
    const svgRef = useRef(null)

    const scaleValues =[1, 10,100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 10000000, 100000]

    const svgHeight = 600
    const [svgWidth, setSvgWidth] = useState(1000);

    const lineScale = d3.scaleLog([1, topData[0][1]], [0, svgHeight/2])
    const xAxis = d3.scaleBand().domain(topData.map((d) => d[0])).rangeRound([0,svgWidth])

    const [centerX, setCenterX] = useState(svgWidth/2)
    const centerY = svgHeight/2

    const [showDropdown, setShowDropdown] = useState(false)
    const [currParent, setCurrParent] = useState(0)
    const [currentText, setCurrentText] = useState(topData[0][0][0])
    const [showSymbol, setShowSymbol] = useState("+")

    useEffect(() => { 
        let newSymbol = showDropdown ? "–": "+"
        setShowSymbol(newSymbol)
    }, [showDropdown])

    function ParentButton({name, parentIndex, setCurrParent, currentIndex}){
        const selectedStyle = "rounded-xl bg-warm-white font-satoshi text-[10px] m-2 p-2  pl-0 text-gray-green font-[800]"
        const unSelectedStyle = "rounded-xl bg-gray-green font-satoshi text-[10px] m-2 p-2  pl-0 text-warm-white font-[800] hover:bg-warm-white hover:text-gray-green" 
        
        let style = parentIndex === currentIndex? selectedStyle: unSelectedStyle
    
        return(
            <button className={style} onClick={() => {setCurrParent(parentIndex); setShowDropdown(false); setCurrentText(name)}}>{name}</button>
        )
    }


    useEffect (() => {
        setDescription("The number of facilities that a given parent company controls and how much waste they produce.")

        setContent({
            T1: "Child Facility:",
            D1: "---",
            T2: "Amount Disposed:",
            D2: "---"})

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("fill", "#CD29F6")
        .attr("r", 5)

        svg.selectAll("g")
        .data(scaleValues)
        .join("line")
            .attr("x1", centerX)
            .attr("x2", svgWidth)
            .attr("y1", d => (lineScale(d)))
            .attr("y2", d => (lineScale(d)))
            .attr("stroke", "#252d26")
            .attr("stroke-width", 1)
            .attr("transform", `translate(0, ${centerY})`)

        svg.selectAll("g")
        .data(scaleValues)
        .join("text")
            .attr("x", svgWidth)
            .attr("y", d => (lineScale(d) - 2))
            .attr("fill", "#252d26")
            .attr("text-anchor", "end")
            .attr("font-size", "18px")
            .text(d => `${d.toLocaleString()} Ibs`)
            .attr("transform", `translate(0, ${centerY})`)
        
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
            if(e[1] < 0.1) {return}
            svg.append("path")
                .attr("transform", `rotate(${rotation}, ${centerX}, ${centerY})`)
                .attr("stroke", "#CD29F6")
                .attr("d", `M ${centerX} ${centerY} v 0`)
                .attr("stroke-width", 1)
                .transition()
                .duration(500)
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
                    setContent({
                        T1: "Child Facility:",
                        D1: e[0],
                        T2: "Amount Disposed:",
                        D2: `${Math.round(e[1]).toLocaleString()} Ibs`})
                    d3.select(event.target).attr("fill-opacity", 1)})
                .on("mouseout", (event) => {
                    setContent({
                        T1: "Child Facility:",
                        D1: "---",
                        T2: "Amount Disposed:",
                        D2: "---"})
                    d3.select(event.target).attr("fill-opacity", .25)})
                .attr("transform", `rotate(${rotation}, ${centerX}, ${centerY})`)
                .transition()
                .duration(500)
                .attr("r", 10)
        
            rotation += rotationAmount
        })
    }, [currParent, centerX])

    const ParentButtons = <div className="grid grid-cols-1 rounded-xl mt-2 absolute z-10 overflow-y-scroll h-[400px] max-w-[310px] bg-gray-green">
        {topData.map((e, i) => <ParentButton name={e[0][0]} parentIndex={i} setCurrParent={setCurrParent} currentIndex={currParent} key={e[0][0]}/>)}
    </div>

    return(
        <div className="grid auto-rows-min gap-y-4"> 
               <div className="">
               <div onClick={() => setShowDropdown(!showDropdown)} className="rounded-xl grid grid-cols-4 bg-gray-green text-warm-white p-4">
                    <p className="col-span-3 self-center">{currentText}</p>
                    <p className="col-span-1 justify-self-end font-[900] self-center text-2xl text-bright-purple">{showSymbol}</p> 
                </div>
                    {showDropdown && ParentButtons}
                </div>
            <div className="min-h-[300px]">
                <svg ref={svgRef} viewBox={`0, 0, ${svgWidth}, ${svgHeight}`} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"/>
            </div>   
        </div>
    )    
}

