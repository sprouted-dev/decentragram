import React, {useEffect, useState} from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import loadWeb3 from "./util/web3-loader";
import Decentragram from "./abis/Decentragram.json";
import ipfsClient from 'ipfs-http-client';

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const App = () => {
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(true);
  const [decentragram, setDecentragram] = useState();
  const [images, setImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);

  const loadBlockchainData = async () => {
      const web3 = await loadWeb3();
      await window.ethereum.enable();
      const {getAccounts, net, Contract} = web3.eth;
      const accounts = await getAccounts();
      const networkId = await net.getId();
      const abiData = Decentragram.networks[networkId];

      if (abiData) {
          const dgram = new Contract(Decentragram.abi, abiData.address);
          setDecentragram(dgram);
          const countString = await dgram.methods.imageCount().call();
          const count = parseInt(countString, 10);
          setImageCount(count);
          const imgList = [];
          for (let i = 1; i <= count; i++) {
              const img = await dgram.methods.images(i).call();
              imgList.push(img);
          }
          imgList.sort((a, b) => b.tipAmount - a.tipAmount);
          setImages(imgList);
      }

      setAccount(accounts[0])
      setLoading(false)
  }

  const uploadImage = async ({imgData, imgDescription}) => {
      const result = await ipfs.add(imgData, (error, result) => {
          if (error) {
              console.error(error);
              return;
          }

      })
      setLoading(true);
      await decentragram.methods.uploadImage(result.path, imgDescription).send({from: account});
      setLoading(false);
  }

  const tipImageOwner = async ({id, tipAmount}) => {
    setLoading(true);
    await decentragram.methods.tipImageOwner(id).send({from: account, value: tipAmount});
    setLoading(false);
  }

  useEffect(() => {
      loadBlockchainData();
  }, []);



  return (
      <div>
        <Navbar account={account} />
        { loading ?
            <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            : <Main images={images}
                uploadImage={uploadImage}
                tipImageOwner={tipImageOwner}/>
        }

      </div>
  );
}

export default App;
