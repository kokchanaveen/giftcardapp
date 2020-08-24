<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>OrderId</th>
          <th>Recipient Name</th>
          <th>Ordered Date</th>
          <th>Gift Card Value</th>
          <th>Commission (5%)</th>
          <th>Delivery Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orderList" v-bind:key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.firstName }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ order.cardPrice }}</td>
          <td>{{ order.commission }}</td>
          <td>{{ order.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { store } from "../helpers/store.js";
import orderservice from "../services/orderservice.js";
export default {
  name: "OrderHistory",
  data() {
    return {
      orderList: [],
    };
  },
  created() {
    if (!store.state.userSession.length) {
      this.$router.push({ name: "Login" });
    }
    orderservice
      .getUserOrders(store.state.userSession[0])
      .then((data) => {
        this.orderList = data;
        console.log(data); // now the data is accessable from here.
      })
      .catch(function(response) {
        console.log(response);
      });
  },
};
</script>
