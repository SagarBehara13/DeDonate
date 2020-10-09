import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <div id="content">
        <h1>Add Request</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.requestName.value
          const price = window.web3.utils.toWei(this.requestPrice.value.toString(), 'Ether')
          const category = this.requestCategory.value
          const story = this.requestStory.value
          const image = this.requestImage.value
          this.props.createRequest(name, price, category, story, image)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="requestName"
              type="text"
              ref={(input) => { this.requestName = input}}
              className="form-control"
              placeholder="Product Name"
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="requestPrice"
              type="text"
              ref={(input) => { this.requestPrice = input}}
              className="form-control"
              placeholder="Product Price"
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="requestCategory"
              type="text"
              ref={(input) => { this.requestCategory = input}}
              className="form-control"
              placeholder="Product Category"
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="requestStory"
              type="text"
              ref={(input) => { this.requestStory = input}}
              className="form-control"
              placeholder="Story"
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
          <button type="submit" className="btn btn-primary">Add Request</button>
        </form>
        <p> </p>
        <h2>Donate</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">Category</th>
              <th scope="col">Story</th>
              <th scope="col">Image</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="requestList">
            { this.props.requests.map((request, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{ request.id.toString() }</th>
                  <td>{ request.name }</td>
                  <td>{ window.web3.utils.fromWei(request.price.toString(), 'Ether') } Eth </td>
                  <td>{ request.owner }</td>
                  <td>{ request.category }</td>
                  <td>{ request.story }</td>
                  <td>{ request.Image}</td>
                  <td>
                    { !request.donated
                      ? <button
                        id={request.id}
                        value={request.price}
                        className="buyButton"
                        onClick={(event) => {
                          this.props.fullFillRequest(event.target.id, event.target.value)
                        }}>
                          Buy
                        </button>
                      : null
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Main;
