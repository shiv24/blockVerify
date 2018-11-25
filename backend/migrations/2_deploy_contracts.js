var ItemContract = artifacts.require('./Item.sol');
module.exports = function(deployer) {
  deployer.deploy(ItemContract).then(() => console.log('Addresss:' +
    ItemContract.address));
}
