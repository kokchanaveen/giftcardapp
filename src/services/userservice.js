//import http from "../http-common";
import axios from "axios";

class userservice {
  baseUrl = "http://localhost:3000/";
  getAllUsers() {
    return axios.get(this.baseUrl + "users").then(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUser(userName) {
    return axios.get(this.baseUrl + "users").then(
      (response) => {
        return response.data.filter((order) => order.userName === userName);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createUser(userName, password, email, admin) {
    //const now = new Date();
    return axios
      .post(this.baseUrl + "users", {
        id: Date.now(),
        userName: userName,
        password: password,
        email: email,
        admin: admin,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new userservice();
