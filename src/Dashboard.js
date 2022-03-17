import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  LinearProgress,
  DialogTitle,
  DialogContent,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import swal from "sweetalert";
const axios = require("axios");
//import user from "../backend/model/user";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      flag: 1,

      empId: "",
      first_name: "",
      last_name: "",
      dob: "",

      salm: "3000",
      saly: "48000",

      contact_number: "",
      misnumber: "",
      password: "",
      // page: 1,
      // search: "",
      products: [],
      name: "",
      // pages: 0,
      // loading: false,
    };
  }

  componentDidMount = () => {
    console.log("ggg");
    let token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    } else {
      // this.getProduct();

      this.setState({ token: token, flag: 0 }, () => {
        this.getProduct();
      });
    }
  };

  getProduct = () => {
    axios
      .get(`http://localhost:2000/get-product`, {
        headers: {
          token: this.state.token,
        },
      })
      .then((res) => {
        console.log("ffff", res);
        this.setState({
          //loading: false,
          products: res,
          name: res.data.products[0].username,

          contact_number: res.data.products[0].contact_number,

          dob: res.data.products[0].dob,

          empId: res.data.products[0].empId,

          first_name: res.data.products[0].first_name,

          last_name: res.data.products[0].last_name,

          password: res.data.products[0].password,
          misnumber: res.data.products[0].misnumber,

          //pages: res.data.pages,
        });
      })
      .catch((err) => {});
  };

  logOut = () => {
    localStorage.setItem("token", null);
    this.props.history.push("/");
  };

  handleProductOpen = () => {
    axios
      .get(`http://localhost:2000/get-salary`, {
        headers: {
          token: this.state.token,
        },
      })
      .then((res) => {
        console.log("ttt", res);
        this.setState({});
      });
  };

  render() {
    return (
      <div>
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <h2>Employees-Dashboard</h2>

          <br />
          <h2> username : </h2>
          {this.state.name}
          <h2> contact_number : </h2>
          {this.state.contact_number}
          <h2> dob : </h2>
          {this.state.dob}
          <h2> empId : </h2>
          {this.state.empId}
          <h2> first_name : </h2>
          {this.state.first_name}
          <h2> last_name : </h2>
          {this.state.last_name}
          <h2> misnumber : </h2>
          {this.state.misnumber}
          <h2> password : </h2>
          {this.state.password}

          <br />

          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handleProductOpen}
          >
            get salary
          </Button>
          <br></br>
          <h2> monthly : </h2>
          {this.state.salm}
          <h2> yearly : </h2>
          {this.state.saly}

          <br></br>
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </div>
      </div>
    );
  }
}
