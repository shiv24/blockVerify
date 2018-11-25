
pragma solidity ^0.4.24;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract Item is ERC721 {

   // ERC20 compatible functions
   address owner;
   bytes4 private constant _InterfaceId_ERC721 = 0x80ac58cd;

   function Item() ERC721() public {
       owner = msg.sender;
   }

   struct Descript {
       uint uid;
       string name;
       string description;
       uint time;
   }

   mapping(uint => Descript) itemInfo;

   //Associate the barcode with the product
   function mint(address _to, uint uid, string name, string description) public payable {
       require(msg.sender == owner);
       Descript memory _itemDescription = Descript(uid,name,description, now);
       itemInfo[uid] = _itemDescription;
       _mint(_to,uid);
   }
   //This function is for the user to verify the information about the product
   function returnInformation(uint uid) public view returns(uint, string,string, uint){
       var itemToReturn = itemInfo[uid];
       return (itemToReturn.uid, itemToReturn.name, itemToReturn.description, itemToReturn.time);
   }
}
