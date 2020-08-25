<template>
  <div>
    <Navigation></Navigation>
    <div key="componentKey">
      <div>
        <h2>Admin Monthly Report</h2>
      </div>
      <br />
      <br />
      <table class="table table-striped">
        <thead>
          <tr>
            <th>OrderId</th>
            <th>Recipient Name</th>
            <th>Gift Card Value</th>
            <th>Commission (5%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orderList" v-bind:key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.firstName }}</td>
            <td>{{ order.cardPrice }}</td>
            <td>{{ order.commission }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <strong>Total Commission :</strong>
              {{commissionPrice}}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import orderservice from "../services/orderservice.js";
export default {
  name: "AdminMonthlyReport",
  components: { Navigation },
  data() {
    return {
      orderList: "",
      renderComponent: true,
      componentKey: 0,
    };
  },
  computed: {
    commissionPrice: function () {
      var totalCommision = 0;
      for (var i = 0; i < this.orderList.length; i++) {
        totalCommision += this.orderList[i].commission;
      }
      return totalCommision;
    },
  },
  created() {
    this.orderList = "";
    orderservice
      .getOrders()
      .then((data) => {
        //this.$set(this.orderList, data);
        this.orderList = data;
        console.log(this.orderList); // now the data is accessable from here.
      })
      .catch(function (response) {
        console.log(response);
      });
  },
};
</script>
