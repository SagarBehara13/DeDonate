import React, { Component } from 'react';

class Charity extends Component {
  render() {
    return (
      <div id="content">
        <h1>Raise Charity Fund</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.requestName.value
          const symbol = this.requestSymbol.value
          const raiseGoal = this.raiseGoal.value
          const cause = this.requestCause.value
          const image = this.requestImage.value
          console.log(name, symbol, raiseGoal, image, cause);
          this.props.raiseFund(name, symbol, raiseGoal, image, cause)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="requestName"
              type="text"
              ref={(input) => { this.requestName = input}}
              className="form-control"
              placeholder="Charity Name"
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="requestSymbol"
              type="text"
              ref={(input) => { this.requestSymbol = input}}
              className="form-control"
              placeholder="Charity Token Symbol"
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="raiseGoal"
              type="text"
              ref={(input) => { this.raiseGoal = input}}
              className="form-control"
              placeholder="Raise Goal"
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="requestCause"
              type="text"
              ref={(input) => { this.requestCause = input}}
              className="form-control"
              placeholder="Cause"
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="requestImage"
              type="text"
              ref={(input) => { this.requestImage = input}}
              className="form-control"
              placeholder="Image"
            />
          </div>
          <button type="submit" className="btn btn-primary">Raise Charity Fund</button>
        </form><br></br>
        <form onSubmit={(event) => {
          event.preventDefault()
          const address = this.deployerAddress.value
          const value = this.requestValue.value
          this.props.approve(address, value)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="deployerAddress"
              type="text"
              ref={(input) => { this.deployerAddress = input}}
              className="form-control"
              placeholder="Spender"
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="requestValue"
              type="text"
              ref={(input) => { this.requestValue = input}}
              className="form-control"
              placeholder="Amount"
            />
          </div>
          <button type="submit" className="btn btn-primary">Approve</button>
        </form>
        <p></p>

        <h2>Donate</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">RaiseGoal</th>
              <th scope="col">Requester</th>
              <th scope="col">Symbol</th>
              <th scope="col">Cause</th>
              <th scope="col">Image</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="requestList">
            { this.props.charityRequests.map((request, key) => {
              console.log("mapped request", request);
              let status

              if(request.live === false){
                console.log("c seller", true);
                status = "Closed"
              } else {
                status = "Live"
              }

              return(
                <tr key={key}>
                  <th scope="row">{ request.id.toString() }</th>
                  <td>{ request.name }</td>
                  <td>{ request.raiseGoal.toString() }</td>
                  <td>{ request.charityAddress }</td>
                  <td>{ request.symbol }</td>
                  <td>{ request.cause }</td>
                  <td>{ request.image}</td>
                  <td>{ status }</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <form onSubmit={(event) => {
          event.preventDefault()
          const id = this.id.value
          const value = this.requestValue.value
          this.props.donateToCharity(id, value)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="id"
              type="text"
              ref={(input) => { this.id = input}}
              className="form-control"
              placeholder="Charity ID"
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="requestValue"
              type="text"
              ref={(input) => { this.requestValue = input}}
              className="form-control"
              placeholder="Amount"
            />
          </div>
          <button type="submit" className="btn btn-primary">Donate</button>
        </form>
      </div>
    )
  }
}

export default Charity;
