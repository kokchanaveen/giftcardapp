import axios from "axios";
const orderStatus = {
  OutDelivery: "OUT FOR DELIVERY",
  Redeemed: "REDEMEED",
  Delivered: "DELIVERED",
};
class orderservice {
  baseUrl = "http://localhost:4000/";

  updateOrderStatus(orderId) {
    this.getOrderByOrderId(orderId)
      .then((originalOrder) => {
        console.log(originalOrder); // now the data is accessable from here.
        return axios
          .put(this.baseUrl + "orders/" + orderId + "/", {
            id: originalOrder.id,
            orderDate: originalOrder.orderDate,
            userName: originalOrder.userName,
            firstName: originalOrder.firstName,
            lastName: originalOrder.lastName,
            cardPrice: originalOrder.cardPrice,
            commission: originalOrder.commission,
            phoneNumber: originalOrder.phoneNumber,
            address: originalOrder.address,
            status: orderStatus.Delivered,
          })
          .then(
            (response) => {
              console.log(response.data);
              return response.data;
            },
            (error) => {
              console.log(error);
            }
          );
      })
      .catch();
  }

  getOrderByOrderId(orderId) {
    return axios.get(this.baseUrl + "orders/" + orderId + "/").then(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getUserOrders(username) {
    return axios.get(this.baseUrl + "orders").then(
      (response) => {
        return response.data.filter((order) => order.userName === username);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getOrders() {
    return axios.get(this.baseUrl + "orders").then(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  createOrder(
    orderDate,
    userName,
    firstName,
    lastName,
    cardPrice,
    commission,
    phoneNumber,
    address,
    status
  ) {
    return axios
      .post(this.baseUrl + "orders", {
        id: Date.now(),
        orderDate: orderDate,
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        cardPrice: cardPrice,
        commission: commission,
        phoneNumber: phoneNumber,
        address: address,
        status: status,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new orderservice();
