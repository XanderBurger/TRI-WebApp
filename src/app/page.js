"use client"
import { useState } from "react"
import CardSet from "./card/cardSet"
import FacilityMap from "./charts/facilityMap"
import TreeMap from "./charts/chemicalTreemap"
import ParentFacilities from "./charts/parentFacilities"

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

  const charts = {
    "map": <FacilityMap setContent={setContent} setKey={setKey}/>,
    "treeMap": <TreeMap setContent={setContent} setKey={setKey}/>
  }

  return (
    <main className="p-2">
      <h1 className="font-[500] font-satoshi text-[75px] text-warm-white">The Toxic Release Inventory</h1>
      <div className="w-[100%] bg-gray-green rounded-3xl grid grid-cols-3 grid-rows-9 overflow-hidden h-[600px]">
          <div className="col-span-2 row-span-1 mt-4 ml-6">
            <ChartButton title={"Map"} chartKey={"map"} setCurrChart={setCurrChart} currChart={currChart}/>
            <ChartButton title={"TreeMap"} chartKey={"treeMap"} setCurrChart={setCurrChart} currChart={currChart}/>
          </div>
          <div className="col-span-2 m-10 row-span-8 rounded-3xl overflow-hidden p-6 bg-black-green">
            {/* {charts[currChart]} */}
            <ParentFacilities setContent={setContent} setKey={setKey} />
          </div>
          <div className="rounded-3xl m-10 bg-black-green row-span-9 grid">
          <p className="font-[500] text-[18px] pl-6 text-warm-white pt-4">
            {content}
          </p>
          <div className="self-end p-6">
            {key}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="w-[100%] bg-gray-green rounded-3xl h-[400px] mt-[10px]">
          <h2 className="font-[500] text-[30px] pl-6 text-warm-white pt-4">About the TRI</h2>
          <p>

          </p>
        </div>
        <div className="ml-[10px]"> 
        <h2 className="font-[500] text-[30px] pl-4 text-warm-white pt-4 h-[60px]">Disposal Types</h2>
        <CardSet cardContent={cardContent} width={620} height={"340px"}/>
        </div>
      </div>
    </main>
  )
}
