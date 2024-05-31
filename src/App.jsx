import { useState,useCallback, useEffect, useRef } from "react"
import "./App.css"

 
const App = () => {
  const[length,setLength]=useState(8);
  const[numberAllowed,setnumberAllowed]=useState(false);
  const[charallowed,setcharallowed]=useState(false);
  const[password,setpassword]=useState("");


  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+='1234567890';
    if(charallowed) str+="{}!@#$%^&*()_+";

    for(let i=0; i<length; i++)
      { 
        let char=Math.floor(Math.random()*str.length+1);
        pass+=str[char];
      }
      setpassword(pass);
     
  },[length,numberAllowed,charallowed,setpassword]);//dependencies

  //copy
  function copyPassword(){
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 99);//to mandatory ,done to increase user Experience
    window.navigator.clipboard.writeText(password);//copy to clipboard
  }

  const passRef=useRef(null);

  

  useEffect(()=>{
    passwordGenerator();
  },[length,charallowed,numberAllowed])//passwordGenerator() will run whenever there is a change is dependencies

  return (
   
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
                type="text"
                value={password}
                className="outline-none w-full py-1 px-3"
                placeholder="Password"
                readOnly
                ref={passRef}
             />
            <button
            onClick={copyPassword}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            >copy</button>
            
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            // onChange={()=>{setLength((e)=>(e.target.value))}}//wrong
            onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() =>{setnumberAllowed((prev)=>!prev)}}
            />
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={charallowed}
                  id="characterInput"
                  onChange={()=>{setcharallowed((prev)=>!prev)}}
              />
              <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
    </div>
    
  )


}

export default App