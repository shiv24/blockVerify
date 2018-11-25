const Web3 = require('web3');
// // const Solc = require('solc');
var cjson = require('./build/contracts/Item.json');
// const fs = require('fs');
var credentials = require('./credentials.json');
var web3 = new Web3(new Web3.providers.HttpProvider(credentials.url));

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
}


// var compiledContract = Solc.compile(fs.readFileSync('./contracts/Item.sol').toString());
var abi = cjson['abi'];
var bytecode = cjson['bytecode'];

// var contract = new web3.eth.contract(abi, credentials.address);
const contract = web3.eth.contract(abi);
const contractInstance = contract.at(credentials.address);

const contractFunctions = {
  createItem(addressTo, uid, name, description) {
    return contractInstance.mint(addressTo, uid, name,
      description, {
        from: web3.eth.accounts[0],
        gas: 3000000
      });
  },

  getItemById(uid) {
    const [
      uidRet,
      name,
      description,
      timestamp,
    ] = contractInstance.returnInformation(uid);
    if (uidRet.toString() === "0") {
      return null;
    } else {
      return {
        uid: uidRet,
        name,
        description,
        timestamp,
        owner: contractInstance.ownerOf(uidRet),
      };
    }
  },

  transferItem(addressFrom, addressTo, uid) {
    console.log(addressFrom, addressTo, uid)
    return contractInstance.safeTransferFrom(addressFrom, addressTo, uid);
  },

  address: credentials.address,
};

// console.log(contractFunctions.transferItem('0xdf27ca165ce04bae58678fb142915ff592316f30', '0xD065b9D4448495F049916262df190C7517cBBec7', 1))

module.exports = contractFunctions;

//mintToken(0x85e11424F055d2322f0F57493B51082aFB70BfeA, 11, "yoooo",
//"Hello");

// function mint(address _to, uint uid, string name, string description) public payable {
//        require(msg.sender == owner);
//        Descript memory _itemDescription = Descript(uid,name,description, now);
//        itemInfo[uid] = _itemDescription;
//        _mint(_to,uid);
//    }
