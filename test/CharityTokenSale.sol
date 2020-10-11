pragma solidity >=0.6.0 <0.7.0;

import "./CharityToken.sol";

contract CharityTokenSale {
  address payable admin;
  CharityToken public tokenContract;
  uint public tokenPrice;
  uint public tokensSold;

  event Sell(address _buyer, uint _amount);

  constructor (CharityToken _tokenContract, uint _tokenPrice) public {
    admin = msg.sender;
    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice;
  }

  function multiply(uint x, uint y) internal pure returns (uint z) {
    require(y == 0 || (z = x * y) / y == x);
  }

  function buyTokens(uint256 _numberOfTokens) public payable {
    require(msg.value == multiply(_numberOfTokens, tokenPrice));
    //require(tokenContract.balanceOf(this) >= _numberOfTokens);
    require(tokenContract.transfer(msg.sender, _numberOfTokens));

    tokensSold += _numberOfTokens;

    emit Sell(msg.sender, _numberOfTokens);
  }

  function endSale() public {
    require(msg.sender == admin);
    //require(tokenContract.transfer(admin, tokenContract.balanceOf(this)));

    admin.transfer(address(this).balance);
  }
}
