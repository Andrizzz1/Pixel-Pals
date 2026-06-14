import { useState, useEffect } from "react"

export default function App(){
  const [userInput, setUserInput] = useState<string>("")
  const buttons:string[] = ["ALL","ACTIVE","DONE"]
  const [contents, setContents] = useState<{text:string, checked: boolean}[]>(()=>{
  const savedContents = localStorage.getItem("contents")
    return savedContents ? JSON.parse(savedContents) : []
  })
  const colors = ['bg-cyan-300', 'bg-green-300', 'bg-pink-300', 'bg-[#fdf6e3]']

  useEffect(() => {
  localStorage.setItem('contents', JSON.stringify(contents))
}, [contents])

  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'DONE'>('ALL')
  function handleDelete(index:number){
    setContents(contents.filter((_, i)=>i!==index))
  }

  const filtered = contents.filter(items =>(
    filter === "ALL" ? true : filter === "ACTIVE" ? !items.checked : items.checked
  ) )
  return <section className="font-jersey">
    <h1 className="text-7xl tracking-wide font-extralight text-center">Pixel Pals</h1>
    <p className=" text-center text-gray-400">a cozy lil' to-do for tiny victories ♡</p>
    <div className="flex justify-center">
     
      <div className="border-2 w-full mx-2 md:w-3xl bg-[#fbf7ec] relative p-5">
       
        <div className="grid grid-cols-6 gap-1">
          <input value={userInput} 
            onChange={(e)=>setUserInput(e.target.value)} 
            onKeyDown={(e)=>{
              if(e.key === 'Enter'){
                if(userInput.trim() === ''){
                alert("please enter a task")
                return
              }
              setContents([...contents,{ text: userInput, checked: false}]); 
                          setUserInput('')              
              }}}
            className="col-span-5 border-3 p-4" type="text" placeholder="what's the quest today?"/>
            <div className="relative">
                <button 
            onClick={()=>{
              if(userInput.trim() === ''){
                alert("please enter a task")
                return
              }            
              setContents([...contents,{ text: userInput, checked: false }]); 
                          setUserInput('')
            }}
            className="col-span-1 border-3 bg-green-400 relative w-full h-full z-10 hover:translate-x-0.5 hover:translate-y-0.5 transition-transform duration-100 cursor-pointer">+ADD</button>
            <div className="absolute inset-0 z-0 translate-x-1 translate-y-1 bg-black"></div>
            </div>

        </div>
        <div className="my-3 flex items-center justify-between">
          <div className="flex items-center text-xl">
            <img className="w-20" src="/imgs/task-goal.png" alt="task Goal" />
            <p >{contents.filter(items => !items.checked).length} LEFT</p>
          </div>


          {/*button */}
          <div className="flex gap-3 max-sm:gap-1">
            {buttons.map((btn, index)=>(
              <div
                key={index}
                onClick={() => setFilter(btn as 'ALL' | 'ACTIVE' | 'DONE')}
                className="relative cursor-pointer w-fit">
                
                {/* shadow — first in DOM = behind */}
                {filter === btn && (
                  <div className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-black"></div>
                )}               
                {/* button face — after in DOM = on top */}
                <div className={`relative border-2 border-black px-5 py-2 ${filter === btn ? "bg-pink-300" : "bg-white"}`}>
                  {btn}
                </div>
              </div>
              ))}
          </div>

        </div>
        {/*contents*/}
        {contents.length === 0?(
          <div className="flex justify-center flex-col items-center">
            <img className="w-20 motion-translate-y-loop-[-25%] motion-opacity-loop-[0%] motion-duration-900/translate motion-duration-300/opacity motion-ease-spring-smooth" src="/imgs/cozy_coffee.png" alt="cozy coffee" />
            <h1 className="text-4xl text-gray-400">EMPTRY LIST ♡</h1>
        </div>):(
          filtered.map((content, index)=>(
            <div className="relative">
              <div className="absolute inset-0  bg-black translate-x-1.5 translate-y-1.5"></div>
              <div key={index} className={`relative flex justify-between items-center border-3 p-3 mb-5 ${colors[index % colors.length]}`}>
                <div className="flex ">
                  <input  
                  className="mr-2 w-5" 
                  type="checkbox" 
                  checked={content.checked}
                  onChange={(e)=>setContents(contents.map((item, i)=>i===index?{...item, checked:e.target.checked}:item))}
                  />
                  <p className={`text-4xl ${content.checked ? 'line-through text-gray-600' : 'text-black'}`}>{content.text}</p>
                </div>
                <button className="text-4xl" onClick={()=>{handleDelete(index)}}>x</button>
                
              </div>
            </div>
          ))
        )}

        {contents.filter(items => items.checked).length != 0?(
          <div className="text-center">
            <button 
            onClick={()=>setContents(contents.filter(items => !items.checked))}
            className="cursor-pointer">clear completed?</button>          
          </div>):null}
           <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black -z-10"></div>
      </div>

    </div>
    <p className="font-jersey  text-center text-gray-400">Made by muddtech♡</p>
    

    {/*design lowl */}
    <img src="/imgs/cloud.png" alt="cloud" 
    className="absolute h-30 left-10 top-0 -z-10 motion-translate-x-loop-0 motion-translate-y-loop-[3%] motion-duration-2000/translate motion-ease-spring-bouncier"/>
    <img src="/imgs/cloud.png" alt="cloud" 
    className="absolute h-30 top-5 -z-10 right-10 motion-translate-x-loop-0 motion-translate-y-loop-[3%] motion-duration-2000/translate motion-ease-spring-bouncier"/>


  </section>
}