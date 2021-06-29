import { useState, useCallback, useEffect } from 'react'
import Web3 from "web3";
import './App.css';


function App() {
  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false)
    const [accounts, setAccounts] = useState([])
    const [balance, setBalance] = useState(0)
    const [web3] = useState(new Web3(Web3.givenProvider || "ws://localhost:8545"))
    const [weiToSend, setWeiToSend] = useState(0)
    const [addressToSend, setAddressToSend] = useState("")
    const [netName, setNetName] = useState([])

  const connectToWeb3 = useCallback(
    async () => {
      if(window.ethereum) {
        try {
          await window.ethereum.request({method: 'eth_requestAccounts'})

          setIsConnectedWeb3(true)
        } catch (err) {
          console.error(err)
        }
      } else {
        alert("Install Metamask")
      }
    }
    )
    useEffect(() => {
      const getAccounts = async () => setAccounts(await web3.eth.getAccounts())
      const getBalance = async () => setBalance(await web3.eth.getBalance(accounts[0]))
      if (accounts.length == 0) getAccounts()
      if (accounts.length > 0) getBalance()
    }, [isConnectedWeb3, accounts])
    const sendEth = useCallback(
    async () => {
      await web3.eth.sendTransaction({ from: accounts[0], to: addressToSend, value: weiToSend })
    },
    [accounts, addressToSend, weiToSend]
  )
  //Pour le network
  //const getNetName = async () => setNetName(await web3.version.getNetwork((err, netId))
  
  return (
    <div>
      <div id="alto" >
            <button  class="sx">
                Kovan
            </button>
            {
              isConnectedWeb3
              ? <div><button class="sx"><a href={`https://kovan.etherscan.io/address/${accounts[0]}`} rel="noreferrer" target="_blank">
              {accounts[0]}
            </a></button></div>
              : <button class="sx" onClick={connectToWeb3}>Connect to web3</button>
              
            }
            
        </div>
        <div id="basso">
            <h3>Wallet dApp</h3>
            <label>Amount Ethers : </label><input disabled value={`${balance} ETH`}></input>
            <br/><label>Address : </label><input type="text" onChange={e => setAddressToSend(e.target.value)} placeholder="address"></input>
            <br/><label>Amount : </label><input type="number" onChange={e => setWeiToSend(e.target.value)}></input>
            <br/><button onClick={sendEth}>Envoyer</button><br/><br/>
            <label>Amount Dogeschool : </label><input value="1000 ETH"></input>
            <br/><label>Address : </label><input></input>
            <br/><label>Amount : </label><input></input>
            <br/><button>Envoyer</button>
        </div>
    </div>
  );
}

export default App;
