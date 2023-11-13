"use client"
import { useState } from "react"
import CardSet from "./card/cardSet"
import FacilityMap from "./charts/facilityMap"
import TreeMap from "./charts/chemicalTreemap"
import ParentFacilities from "./charts/parentFacilities"
import ChemByFacility from "./charts/chemicalsByFacilities"
import ProductionRatios from "./charts/productionRatio"

const cardContent = [
  {
    title: "water",
    color: "#0EF1FF",
    content: "Chemicals released as surface water discharge. Meaning chemicals that have either directly or indirectly been released into bodies of water on or off site.",
  },
  {
    title: "recycled",
    color: "#16FF58",
    content: "Chemicals recycled for reuse.",
  },
  {
    title: "air stack",
    color: "#FF9F0E",
    content: "Chemicals released by air stacks and fumes.",
  },
  {
    title: "underground",
    color: "#CD29F6",
    content: "A release type involving pumping chemicals deep underground into specialized wells.",
  },
  {
    title: "land treatment",
    color: "#FF2056",
    content: "Chemicals that have been applied to the environment as a part of farming practices. Meaning fertilizers, pesticides or herbicides.",
  }
]

const whatText = "The TRI or Toxic Release Inventory is a program run by the EPA to provide transparency on how and where chemicals that are harmful to human health are released into the environment. The program requires facilities to report where, how, and what chemicals are being disposed of. This data is then gathered by the EPA and released to the public. "
const whenText = "The TRI was established following the 1984 Bhopal Chemical Plant disaster which led to the death of thousands in India after a toxic gas leak, and a series of similar chemical leaks at a plant in West Virginia. Congress passed the Right-to-Know Act in 1986 which created the Toxic Release Inventory. Every year since designated facilities are required to report their chemical releases. "


function ChartButton({title, chartKey, setCurrChart, currChart}){
  const selectedStyle = "rounded-xl bg-warm-white font-satoshi text-[18px] ml-4 p-2 text-black-green font-[500]"
  const unSelectedStyle = "rounded-xl bg-black-green font-satoshi text-[18px] ml-4 p-2 text-warm-white font-[500] hover:bg-warm-white hover:text-black-green" 

  let style = chartKey === currChart? selectedStyle: unSelectedStyle

  return(
    <button className={style} onClick={() => {setCurrChart(chartKey)}}>{title}</button>
  )
}

export default function Home() {
  const [content, setContent] = useState("test")
  const [key, setKey] = useState("test")
  const [currChart, setCurrChart] = useState("map")
  const [description, setDescription] = useState("test")

  const charts = {
    "map": <FacilityMap setContent={setContent} setKey={setKey} setDescription={setDescription}/>,
    "treeMap": <TreeMap setContent={setContent} setKey={setKey} setDescription={setDescription}/>,
    "parentFacilities": <ParentFacilities setContent={setContent} setKey={setKey} setDescription={setDescription}/>,
    "chemByFacility": <ChemByFacility setContent={setContent} setKey={setKey} setDescription={setDescription}/>,
    "productionRatio": <ProductionRatios setContent={setContent} setKey={setKey} setDescription={setDescription}/>
  }

  return (
    <main className="p-2 font-satoshi">
      <h1 className="font-[500] font-satoshi text-[75px] text-warm-white">The Toxic Release Inventory</h1>
      <div className="w-[100%] bg-gray-green rounded-3xl grid grid-cols-3 grid-rows-9 ">
          <div className="col-span-2 row-span-1 mt-4 ml-6">
            <ChartButton title={"Map"} chartKey={"map"} setCurrChart={setCurrChart} currChart={currChart}/>
            <ChartButton title={"TreeMap"} chartKey={"treeMap"} setCurrChart={setCurrChart} currChart={currChart}/>
            <ChartButton title={"Parent Facilities"} chartKey={"parentFacilities"} setCurrChart={setCurrChart} currChart={currChart}/>
            <ChartButton title={"Chem Facilities"} chartKey={"chemByFacility"} setCurrChart={setCurrChart} currChart={currChart}/>
            <ChartButton title={"Production Ratios"} chartKey={"productionRatio"} setCurrChart={setCurrChart} currChart={currChart}/>
          </div>
          <div className="col-span-2 m-10 mr-0 row-span-8 rounded-3xl p-6 bg-black-green">
            {charts[currChart]}
          </div>
          <div className="m-10 grid auto-rows-min gap-4">
            <div className="rounded-3xl bg-black-green grid h-[200px]">
              <div className="p-4">
                <h2 className="font-[500] text-[30px] text-warm-white">Key</h2>
                {key}
              </div>
              
            </div>
            <div className="rounded-3xl bg-black-green grid auto-rows-min h-[300px]">
              <div className="p-4">
                <h2 className="font-[500] text-[30px] text-warm-white">About the Chart</h2>
                <p className="font-[500] text-[18px] text-warm-white">
                  {description}
                </p>
              </div>
              <div className="p-4">
                <h2 className="font-[500] text-[30px] text-warm-white">Current Selections</h2>
                <p className="font-[500] text-[18px] text-warm-white">
                  {content}
                </p>
              </div>
            </div>
          </div>
      </div>
      <div className="grid grid-cols-2 mt-5">
        <div className="w-[100%] bg-gray-green rounded-3xl mt-[10px]">
          <h2 className="font-[500] text-[30px] pl-6 text-warm-white pt-4">About the TRI</h2>
          <div className="text-warm-white p-6">
            <h3 className="font-[700] text-[24px]">
            What is it?
            </h3>
            <p>
            {whatText}
            </p>
          </div>
          <div className="text-warm-white p-6">
            <h3 className="font-[700] text-[24px]">
            When did it start? 
            </h3>
            <p>
            {whenText}
            </p>
          </div>
        </div>
        <div className="ml-[10px]"> 
        <h2 className="font-[500] text-[30px] pl-4 text-warm-white pt-4 h-[60px]">Disposal Types</h2>
        <CardSet cardContent={cardContent} width={620} height={"340px"}/>
        </div>
      </div>
    </main>
  )
}
