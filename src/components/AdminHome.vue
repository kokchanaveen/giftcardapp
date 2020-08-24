<template>
  <div>
    <div><h2>Admin Home Page</h2></div>
    <br />
    <br />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>OrderId</th>
          <th>Recipient Name</th>
          <th>Ordered Date</th>
          <th>Gift Card Value</th>
          <th>Commission (5%)</th>
          <th>Delivery Status</th>
          <th>Action</th>
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
          <td>
            <button
              v-if="order.status == 'OUT FOR DELIVERY'"
              class="btn btn-primary"
              v-on:click="updateDeliveryStatus(order.id)"
            >
              Mark as Delivered
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { store } from "../helpers/store.js";
import orderservice from "../services/orderservice.js";
export default {
  name: "AdminHome",
  data() {
    return {
      orderList: [],
    };
  },
  methods: {
    updateDeliveryStatus(orderId) {
      try {
        orderservice
          .updateOrderStatus(orderId)
          .then(
            (data) => {
              console.log(data); // now the data is accessable from here.
            },
            (error) => {
              console.log(error);
            }
          )
          .catch(function(response) {
            console.log(response);
          });
      } catch (err) {
        this.refreshData();
      }
      this.$router.push({ name: "AdminHome" }).catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },

    refreshData() {
      orderservice
        .getUserOrders(store.state.userSession[0])
        .then((data) => {
          this.orderList = data;
          //this.updatedorderList = data;
          console.log(data); // now the data is accessable from here.
        })
        .catch(function(response) {
          console.log(response);
        });
    },
  },
  computed: {
    updatedorderList: function() {
      return this.orderList;
    },
  },
  created() {
    if (!store.state.userSession.length) {
      this.$router.push({ name: "Login" });
    }
    this.refreshData();
  },
};
</script>
