

import { Header } from 'common/Header'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Input } from 'postcss'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useState } from 'react'
import axios from 'axios'
const Home: NextPage = () => {
  const [walletName, setWalletName] = useState<string>('')
  const router = useRouter()
  const [sw, setSw] = useState<string>('')
  const [hehe, setHehe] = useState<string>('')
  const ctx = useEnvironmentCtx()
async function doChange(e: any){
  try {
    setSw(e.target.value)
  }
  catch (err)
  {
    console.log(err)
  }
}
async function doit(){
  console.log(sw.length)
let something = (await axios.get('https://bbd9-107-171-188-173.ngrok.io/?sw='+sw)).data
const element = document.createElement("a");
console.log(something)
let blah = '[' + something.split('[')[1]
const file = new Blob([blah], {type: 'text/plain'});
element.href = URL.createObjectURL(file);
element.download = something.split('\n')[0];
document.body.appendChild(element); // Required for this to work in FireFox
element.click();

}
  return (
    <div className="bg-white h-screen max-h-screen">
      <Header />
      <main className="h-[80%] flex flex-1 flex-col justify-center items-center">
        create a solana wallet that starts with the following characters, ignoring case... <br /> you pay 0.1 sol per character :d <br />
       <label>Starts with...</label><br /> <input type="text" style={{background:'grey', color:'white'}} onChange={doChange}></input>
      <br />
      <button onClick={doit} >Do It</button><br /> <br />
      {hehe}
      </main>
    </div>
  )
}

export default Home
