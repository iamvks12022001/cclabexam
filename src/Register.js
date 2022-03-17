import React, { Component } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@material-ui/core";
const axios = require("axios");

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm_password: "",
      empId: "",
      first_name: "",
      last_name: "",
      dob: "",
      contact_number: "",
      misnumber: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {
    axios
      .post("http://localhost:2000/register", {
        username: this.state.username,
        password: this.state.password,

        empId: this.state.empId,
        first_name: this.state.first_name,

        last_name: this.state.last_name,
        dob: this.state.dob,

        contact_number: this.state.contact_number,
        misnumber: this.state.misnumber,
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
      });
  };

  render() {
    return (
      <div style={{ marginTop: "200px" }}>
        <div>
          <h2>Register</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="empId"
            value={this.state.empId}
            onChange={this.onChange}
            placeholder="employe ID"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="first_name"
            value={this.state.first_name}
            onChange={this.onChange}
            placeholder=" first name"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="last_name"
            value={this.state.last_name}
            onChange={this.onChange}
            placeholder="last name"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="dob"
            value={this.state.dob}
            onChange={this.onChange}
            placeholder="dob"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="contact_number"
            value={this.state.contact_number}
            onChange={this.onChange}
            placeholder="contact number"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="misnumber"
            value={this.state.misnumber}
            onChange={this.onChange}
            placeholder="Mis Number(IIITP)"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password"
            required
          />
          <br />
          <br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username == "" && this.state.password == ""}
            onClick={this.register}
          >
            Register
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/">Login</Link>
        </div>
      </div>
    );
  }
}
