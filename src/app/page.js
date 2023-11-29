"use client"
import Image from 'next/image';
import { useState } from "react"
import FacilityMap from "./charts/facilityMap"
import TreeMap from "./charts/chemicalTreemap"
import ParentFacilities from "./charts/parentFacilities"
import ChemByFacility from "./charts/chemicalsByFacilities"
import ProductionRatios from "./charts/productionRatio"
import TreeMapKey from "./assets/keys/TreeMapKey.svg"
import ChemFacilityKey from "./assets/keys/ChemFacilityKey.svg"
import MapKey from "./assets/keys/MapKey.svg"
import ParentKey from "./assets/keys/ParentKey.svg"
import ChangeKey from "./assets/keys/ChangeKey.svg"


const cardContent = [
  {
    title: "Surface Water",
    color: "#0EF1FF",
    content: "Chemicals released as surface water discharge. Meaning chemicals that have either directly or indirectly been released into bodies of water on or off site.",
  },
  {
    title: "Recycled",
    color: "#16FF58",
    content: "Chemicals recycled for reuse.",
  },
  {
    title: "Air Stack",
    color: "#FF9F0E",
    content: "Chemicals released by air stacks and fumes.",
  },
  {
    title: "Underground Wells",
    color: "#ff4e17",
    content: "Chemicals that have been pumped deep underground into specialized wells.",
  },
  {
    title: "Land Treatment",
    color: "#ff246d",
    content: "Chemicals that have been applied to the environment as a part of farming practices. Meaning fertilizers, pesticides or herbicides.",
  },
  {
    title: "Surface Impoundment",
    color: "#3e30f9",
    content: "A surface impoundment uses natural topographic depressions, man-made excavations, or diked areas for temporary storage or treatment of liquid hazardous waste. Examples include ponds, pits and lagoons such as: Holding ponds. Storage pits.",
  },
  {
    title: "Landfill",
    color: "#cd29f6",
    content: "Chemicals that have been disposed in landfills off site.",
  }
]

const whatText = "The TRI or Toxic Release Inventory is a program run by the EPA to provide transparency on how and where chemicals that are harmful to human health are released into the environment. The program requires facilities to report where, how, and what chemicals are being disposed of. This data is then gathered by the EPA and released to the public. "
const whenText = "The TRI was established following the 1984 Bhopal Chemical Plant disaster which led to the death of thousands in India after a toxic gas leak, and a series of similar chemical leaks at a plant in West Virginia. Congress passed the Right-to-Know Act in 1986 which created the Toxic Release Inventory. Every year since designated facilities are required to report their chemical releases. "


function ChartButton({title, chartKey, setCurrChart, setContent, currChart}){
  const selectedStyle = "rounded-xl bg-warm-white font-satoshi text-[18px] ml-4 p-2  mt-4 text-black-green font-[500]"
  const unSelectedStyle = "rounded-xl bg-black-green font-satoshi text-[18px] ml-4 mt-4 p-2 text-warm-white font-[500] hover:bg-warm-white hover:text-black-green" 

  let style = chartKey === currChart? selectedStyle: unSelectedStyle

  return(
    <button className={style} onClick={() => {setCurrChart(chartKey); setContent("")}}>{title}</button>
  )
}

function Card({title, content, color}){
  return(
      <div className="text-warm-white pt-4">
      <h3 className={"font-[700] text-[24px]"} style={{color:color}}>
        {title}
      </h3>
      <p>
        {content}
      </p>
      </div> 
  )
}

export default function Home() {
  const blankContent = {
   T1: "Title:",
   D1: "Amount",
   T2: "Title 2:",
   D2: "Amount 2"}


  const [content, setContent] = useState(blankContent)
  const [currChart, setCurrChart] = useState("map")
  const [description, setDescription] = useState("")

  const charts = {
    "map": {chart: <FacilityMap setContent={setContent} setDescription={setDescription}/>, key:MapKey},
    "treeMap": {chart: <TreeMap setContent={setContent} setDescription={setDescription}/>, key:TreeMapKey},
    "parentFacilities": {chart:<ParentFacilities setContent={setContent} setDescription={setDescription}/>, key:ParentKey},
    "chemByFacility": {chart: <ChemByFacility setContent={setContent} setDescription={setDescription}/>, key:ChemFacilityKey},
    "productionRatio": {chart: <ProductionRatios setContent={setContent} setDescription={setDescription}/>, key:ChangeKey}
  }

  // "Facility Map": {chart: <FacilityMap setContent={setContent} setDescription={setDescription}/>, key:MapKey},
  //   "Chemical Disposal Amount": {chart: <TreeMap setContent={setContent} setDescription={setDescription}/>, key:TreeMapKey},
  //   "Parent Facilities": {chart:<ParentFacilities setContent={setContent} setDescription={setDescription}/>, key:ParentKey},
  //   "Disposal Per Facility": {chart: <ChemByFacility setContent={setContent} setDescription={setDescription}/>, key:ChemFacilityKey},
  //   "2020 - 2021 Production Ratios": {chart: <ProductionRatios setContent={setContent} setDescription={setDescription}/>, key:ChangeKey}
  // }
  return (
    <>
    <main className="font-satoshi overflow-hidden px-2 lg:px-6 sm:px-2">
      {/* <a href='#footer' className='float-right text-warm-white pl-4 hover:text-gray-green'>Sources</a>
      <a href='#footer' className='float-right text-warm-white hover:text-gray-green'>About</a> */}
      <h1 className="font-[500] font-satoshi text-[75px] text-warm-white leading-[.9em] py-6">The Toxic Release Inventory</h1>
      <div className=" bg-gray-green rounded-3xl grid grid-cols-3 grid-rows-9">
          <div className="col-span-3 row-span-1 ml-0 lg:ml-0 sm:ml-0">
            <ChartButton title={"Facility Map"} chartKey={"map"} setCurrChart={setCurrChart} setContent={setContent} currChart={currChart}/>
            <ChartButton title={"Chemical Disposal Amount"} chartKey={"treeMap"} setCurrChart={setCurrChart} setContent={setContent} currChart={currChart}/>
            <ChartButton title={"Parent Facilities"} chartKey={"parentFacilities"} setCurrChart={setCurrChart} setContent={setContent} currChart={currChart}/>
            <ChartButton title={"Disposal Per Facility"} chartKey={"chemByFacility"} setCurrChart={setCurrChart} setContent={setContent} currChart={currChart}/>
            <ChartButton title={"2020 - 2021 Production Ratios"} chartKey={"productionRatio"} setCurrChart={setCurrChart} setContent={setContent} currChart={currChart}/>
          </div>
          <div className="col-span-3 grid row-span-8 rounded-3xl p-4 sm:p-4 lg:p-6 bg-black-green m-2 sm:m-2 lg:m-4 sm:grid-cols-2 lg:grid-cols-3 ">
            <div className='col-span-2'>
            {charts[currChart].chart}
            </div>
            <div className="grid auto-rows-min gap-4 ml-0 mt-4 lg:mt-0 sm:mt-4 lg:ml-6 sm:ml-0 lg:col-span-1 lg:grid-cols-1 sm:grid-cols-3 sm:col-span-2">    
              <div className="grid">
                <div className="grid justify-items-start">
                  <Image src={charts[currChart].key} alt ="Chart key" className='pt-4'/>
                </div>
              </div>
              <div className='p-0 pt-0 overflow-hidden h-[140px]'>
                <h3 className='text-[18px] font-[500] text-warm-white'>
                  {content.T1}
                </h3>
                <h2 className='text-[24px] font-[900] text-warm-white overflow-hidden h-[40px]'>
                  {content.D1}
                </h2>
                <h3 className='text-[18x] font-[500] text-warm-white'>
                  {content.T2}
                </h3>
                <h2 className='text-[24px] font-[900] text-warm-white h-[40px]'>
                  {content.D2}
                </h2>
              </div>
              <div className="rounded-3xl bg-gray-green grid auto-rows-min">
                <div className="p-4 pt-2">
                  <h3 className='font-[700] text-[24px] text-warm-white'>About the Chart</h3>
                  <p className="font-[500] text-[18px] text-warm-white">
                    {description}
                  </p>
                </div>
              </div>
            </div>
           
          </div>
          
      </div>
      <div className="grid grid-cols-1 mt-2 sm:grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="w-[100%] bg-gray-green rounded-3xl mt-2">
          <h2 className="font-[500] text-[30px] px-6 text-warm-white pt-4">About the TRI</h2>
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
        <div className="w-[100%] bg-gray-green rounded-3xl mt-2">
          <h2 className="font-[500] text-[30px] px-6 text-warm-white pt-4">About the Release Types</h2>
          <div className='px-6 pb-6'>
            {cardContent.map(e => <Card title={e.title} content={e.content} color={e.color} key={e.title}/>)}
          </div>
          
          
         
        </div>
        {/* <div className="ml-8"> 
         <h2 className="font-[500] text-[30px] text-warm-white pt-4 h-[60px]">Disposal Types</h2>
        <CardSet cardContent={cardContent} width={700} height={"400px"}/>
        </div> */}
      </div>
      <div id="footer" className='width-full my-4 bg-black-green'>
        <h3 className="font-[300] text-[24px] text-warm-white">More About the TRI</h3>
        <div className='flex'>
        <a className='text-[14px] text-warm-white p-4 pl-0 hover:text-bright-purple' href='https://www.epa.gov/toxics-release-inventory-tri-program'>Program Home Page</a>
        <a className='text-[14px] text-warm-white p-4 pl-0 hover:text-bright-purple' href='https://catalog.data.gov/dataset/toxics-release-inventory-tri'>Data</a>
        </div>
      </div>
    </main>
    </>
  )
}
