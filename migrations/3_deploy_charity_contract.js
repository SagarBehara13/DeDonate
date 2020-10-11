const CharityToken = artifacts.require("CharityToken")
//const CharityTokenSale = artifacts.require("CharityTokenSale")

module.exports = function(deployer) {
  deployer.deploy(CharityToken)
  //deployer.deploy(CharityToken).then(function(){
  //   // // 1$ price for token 0.0027;
  //   // var tokenPrice = 2700000000000000;
  //   // return deployer.deploy(CharityTokenSale, CharityToken.address, tokenPrice);
  // });
};
