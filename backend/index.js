const Web3 = require('web3');
const Solc = require('solc');
var cjson = require('./build/contracts/Item.json');
const fs = require('fs');
var contractAddress = '0x5b6f4c1fc9d44f4e4fb4625a450f39f0c6093960';
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


var compiledContract = Solc.compile(fs.readFileSync('./contracts/Item.sol').toString());
var abi = cjson['abi'];
var bytecode = cjson['bytecode'];

// var contract = new web3.eth.contract(abi, contractAddress);
const contract = web3.eth.contract(abi);
const contractInstance = contract.at(contractAddress);

function mintToken(addressTo, uid, name, description) {
  console.log(contractInstance.mint(addressTo, uid, name,
    description, {
      from: web3.eth.accounts[0],
      gas: 3000000
    }));
}

//mintToken(0x85e11424F055d2322f0F57493B51082aFB70BfeA, 11, "yoooo",
//"Hello");



function getInfoById(id) {
  console.log(contractInstance.returnInformation(id));
}

// function mint(address _to, uint uid, string name, string description) public payable {
//        require(msg.sender == owner);
//        Descript memory _itemDescription = Descript(uid,name,description, now);
//        itemInfo[uid] = _itemDescription;
//        _mint(_to,uid);
//    }
