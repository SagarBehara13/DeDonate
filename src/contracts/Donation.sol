pragma solidity >=0.6.0 <0.7.0;

contract Donation {
  string public name;
  uint public requestCount = 0;
  mapping (uint => Request) public requests;

  struct Request{
    uint id;
    string name;
    uint price;
    address payable owner;
    address payable donator;
    bool donated;
    string category;
    string story;
    string image;
  }

  constructor () public {
    name = "DeDonate";
  }

  event productCreated(
    uint id,
    string name,
    uint price,
    address payable owner,
    bool donated,
    string category,
    string story,
    string image
  );

  event fullfillRequest(
    uint id,
    string name,
    uint price,
    address payable owner,
    bool donated
  );

  function createRequest(string memory _name, uint _price, string memory _category, string memory _story, string memory _image) public {
    require(bytes(_name).length > 0);
    require(_price > 0);

    requestCount ++;
    requests[requestCount] = Request(requestCount, _name, _price, msg.sender, msg.sender, false, _category, _story, _image);
    emit productCreated(requestCount, _name, _price, msg.sender, false, _category, _story, _image);
  }

  function fullFillRequest(uint _id) public payable {
    Request memory _request = requests[_id];
    address payable _seller = _request.owner;
    require(_request.id > 0 && _request.id <= requestCount);
    require(msg.value >= _request.price);
    require(!_request.donated);
    require(_seller != msg.sender);

    _request.owner = _seller;
    _request.donator = msg.sender;
    _request.donated = true;
    requests[_id] = _request;
    _seller.transfer(msg.value);

    emit fullfillRequest(requestCount, _request.name, _request.price, msg.sender, true);
  }
}
