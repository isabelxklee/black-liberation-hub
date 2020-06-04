import React, { Component } from 'react'
import {connect} from 'react-redux'

class CreateAccount extends Component {
  state = {
    username: "",
    email_address: "",
    password: "",
    password_confirmation: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      username: "",
      email_address: "",
      password: "",
      password_confirmation: ""
    })
    this.props.propsCreateUser(this.state)
  }

  render() {
    return (
      <div>
        <h1>Create an account</h1>
        <form onSubmit={this.handleSubmit}>
        <label>
          Username
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Email Address
          <input
            name="email_address"
            type="text"
            value={this.state.email_address}
            onChange={this.handleChange} />
        </label><br />
        <label>
          Password
          <input
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleChange} />
        </label><br />
        <label>
          Confirm Password
          <input
            name="password_confirmation"
            type="text"
            value={this.state.password_confirmation}
            onChange={this.handleChange} />
        </label><br />
        <input type="submit" value="Create" />
      </form>
      </div>
    )
  }
}

let createUser = (user) => {
  return {
    type: "CREATE_USER",
    payload: user
  }
}

let mapDispatchToProps = {
  propsCreateUser: createUser
}

export default connect(null, mapDispatchToProps)(CreateAccount)