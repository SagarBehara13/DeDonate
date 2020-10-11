pragma solidity >=0.6.0 <0.7.0;

contract CharityToken {
  string  public name;
  string  public symbol;
  uint256 public totalSupply = 0;
  uint public charityAmount;
  address payable public charityAddress;
  uint public raiseGoal;
  uint public tokenPrice;
  uint public charityRequestCount = 0;
  mapping(address => uint) public donators;
  mapping(uint => CharityRequest) public onGoingCharity;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
  );

  struct CharityRequest{
    uint id;
    string name;
    string symbol;
    uint raiseGoal;
    uint ammountRaised;
    address payable charityAddress;
    bool live;
    string cause;
    string image;
  }

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  function createToken(string memory _name, string memory _symbol, uint256 _initialSupply, string memory image, string memory cause) public {
    name = _name;
    symbol = _symbol;
    balanceOf[msg.sender] = _initialSupply;
    totalSupply += _initialSupply;
    raiseGoal = _initialSupply;
    charityAddress = msg.sender;
    tokenPrice = 2700000000000000;
    charityRequestCount ++;

    onGoingCharity[charityRequestCount] = CharityRequest(charityRequestCount, _name, _symbol, _initialSupply, 0, msg.sender, true, cause, image);
  }


  function approve(address _spender, uint256 _value) public returns (bool success) {
    require(_spender == charityAddress);
    allowance[msg.sender][_spender] = _value;

    emit Approval(msg.sender, _spender, _value);

    return true;
  }

  function multiply(uint x, uint y) internal pure returns (uint z) {
    if (x == 0) {
        return 0;
    }

    z = x * y;
    require(z / x == y, "SafeMath: multiplication overflow");

    return z;
  }

  function donateToCharity(uint _id, uint value) public payable {
    CharityRequest memory _request = onGoingCharity[_id];
    address payable _charityAddress = _request.charityAddress;
    _request.raiseGoal = _request.raiseGoal - value;
    _request.ammountRaised += value;
    balanceOf[_charityAddress] -= value;
    onGoingCharity[_id] = _request;
    charityAmount =  multiply(2700000000000000 , value);

    donators[msg.sender] = value;
    transfer(msg.sender, value);
    //_charityAddress.transfer(charityAmount);
  }

  function claimTokens() public payable{
    uint val = donators[msg.sender];
    require(val > 0, "No Token Earned");
    transfer(msg.sender, val);
  }
  //
  function transfer(address _to, uint256 _value) public returns (bool success) {
    //require(totalSupply >= _value);

    //raiseGoal -= _value;
    balanceOf[msg.sender] += _value;

    emit Transfer(msg.sender, _to, _value);

    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(_value <= balanceOf[_from]);
    require(_value <= allowance[_from][msg.sender]);

    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;

    allowance[_from][msg.sender] -= _value;

    emit Transfer(_from, _to, _value);

    return true;
  }
}
