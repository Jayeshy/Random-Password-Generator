import { useCallback, useEffect, useRef, useState } from 'react'
function App() {
  const [length, setLength]= useState(8);
  const [numberAllowed, setNumberAllowed]=useState(false)
  const [symbolAllowed, setSymbolAllowed]=useState(false)
  const [password, setPassword]=useState(false)

  //useRef hook
  const passwordRef=useRef(null)

  //useCallBack hook
  const passwordGenerator= useCallback(()=>{
    let pass='';
    let str='QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    if(numberAllowed) str+="1235678904";
    if(symbolAllowed) str+='!@#%^&*(*)_+=[];[];,./{}:<>?|`~';

    for(let i=1; i<length; i++){
        let index=Math.floor(Math.random()*str.length);
        pass+=str.charAt(index);

    }
    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed])

  const copy= useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);
  }, [password])

  //useEffect hook
  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, symbolAllowed])
  return (
      <div className='px-10 py-3 items-center bg-gray-800 text-orange-500'>
      <h2 className='text-xl text-white text-center'>Password Generator</h2>
        <div className= 'flex'>
          <input type='text' className='outline-none w-full py-1 px-3'
          placeholder='Password' readOnly
          ref={passwordRef}
          value={password} />
          <button onClick={copy} className='rounded-none bg-blue-700 text-white'>copy</button>
        </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'></div>
        <input type='range' min={8} max={100} value={length}
        className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}
        />
        <lable>Length: {length}</lable>
         </div>
         <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed((prev) => !prev)}}/>
          <label htmlFor="numberInput">Numbers</label>
         </div>
         <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={symbolAllowed} onChange={()=>{setSymbolAllowed((prev) => !prev)}}/>
          <label htmlFor="symbolInput">Symbols</label>
         </div>
      </div>
  )
}
export default App
