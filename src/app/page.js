import CardSet from "./card/cardSet"


const cardContent = [
  {
    title: "water",
    color: "#0EF1FF",
    content: <div>test</div>,
  },
  {
    title: "recycled",
    color: "#16FF58",
    content: <div>test</div>,
  },
  {
    title: "air stack",
    color: "#FF9F0E",
    content: <div>test</div>,
  },
  {
    title: "underground",
    color: "#CD29F6",
    content: <div>test</div>,
  },
  {
    title: "land treatment",
    color: "#FF2056",
    content: <div>test</div>,
  }
]

export default function Home() {
  return (
    <main className="p-2">
      <h1 className="font-[500] font-satoshi text-[75px] text-warm-white">The Toxic Release Inventory</h1>
      <div className="w-[100%] bg-gray-green rounded-3xl h-[600px]">

      </div>
      <div className="grid grid-cols-2">
        <div className="w-[100%] bg-gray-green rounded-3xl h-[400px] mt-[10px]">
          <h2 className="font-[500] text-[30px] pl-4 text-warm-white pt-4">About the TRI</h2>
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
