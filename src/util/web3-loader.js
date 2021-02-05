const Web3 = require("web3");

const loadWeb3 = async () => {
    if (window.ethereum) {
        return new Web3(Web3.givenProvider)
    } else if (window.web3) {
        return new Web3(window.web3.currentProvider)
    } else {
        window.alert('Ethereum support not detected.')
    }
}

export default loadWeb3;