

import { Header } from 'common/Header'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useState } from 'react'

const Home: NextPage = () => {
  const [walletName, setWalletName] = useState<string>('')
  const router = useRouter()
  const ctx = useEnvironmentCtx()

  return (
    <div className="bg-white h-screen max-h-screen">
      <Header />
      <main className="h-[80%] flex flex-1 flex-col justify-center items-center">
        <div className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-6">
          Welcome to Stacc Hydra UI
        </div>
        Turns out Metaplex removed the option of having hydras feeding other hydras, much to staccs dismay :D

        <br /><br />
        There are two hydras.
<br /> <br />
        The nft hydra has all the stacc nfts added, except about 500 that didnt play along. Those points went to Jares cardinal twitter nft.

        <br />
        The token hydra has tokens that can be bought with USDCs. They have four fees: buy/sell usdc/token. These go to jaregm.sol...
        <br />
        Most staccs have had their creators array adjusted and now pay the NFT hydra.
        <br />
        Every 24 hours 5% of the balance of jaregm.sol is sent to each hydra.
        <br /><br />
        Have fun.
          <div className="w-full mb-6   flex flex-1 flex-col justify-center items-center">
           <div>
             <div
               className="bg-blue-400 text-white hover:bg-blue-500 px-4 py-3 rounded-md float-right cursor-pointer"
               onClick={() => {
                 router.push(
                   `/s4Etok`,
                   undefined,
                   { shallow: true }
                 )
               }}
             >
               Load Token Hydra
             </div>
           </div>
           <br />
           <br />
            <div>
              <div
                className="bg-blue-400 text-white hover:bg-blue-500 px-4 py-3 rounded-md float-right cursor-pointer"
                onClick={() => {
                  router.push(
                    `/s4Enfts`,
                    undefined,
                    { shallow: true }
                  )
                }}
              >
                Load Nft Hydra
              </div>
            </div>
           
          </div>
      </main>
    </div>
  )
}

export default Home
