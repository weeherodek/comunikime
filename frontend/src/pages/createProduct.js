import React from "react";
import api from "../services/api";

import Header from "../components/header";

const initialState = {
  name: "",
  description: "",
  quantity: 0,
  value: 0,
  image: "",
};

export default class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
    console.log(this.state);
  }

  onSubmit(ev) {
    ev.preventDefault();
    api
      .post("/product", {
        name: this.state.name,
        description: this.state.description,
        quantity: this.state.quantity,
        value: this.state.value,
        image: this.state.image,
      })
      .then(() => {
        alert("Product created with success!");
        this.setState(initialState);
      })
      .catch((err) => alert("Erro on creating product, try again later."));
  }

  render() {
    return (
      <div className="container">
        <Header />
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Product Name"
                required
                name="name"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="description" className="col-sm-2 col-form-label">
              Description
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Description"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="quantity" className="col-sm-2 col-form-label">
              Quantity
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="quantity"
                placeholder="Quantity"
                name="quantity"
                min="1"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="value" className="col-sm-2 col-form-label">
              Value
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="value"
                placeholder="Value"
                min="1"
                name="value"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="image" className="col-sm-2 col-form-label">
              Value
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="image"
                placeholder="Image"
                min="1"
                name="image"
                onChange={this.onChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-10">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.create}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
