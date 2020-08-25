<template>
  <div>
    <Navigation></Navigation>
    <h2>Place New Order</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="orderDate">Date : {{ orderDate }}</label>
      </div>
      <div class="form-group">
        <label for="firstName">Recipeint First Name</label>
        <input
          type="text"
          v-model="firstName"
          name="firstName"
          class="form-control"
          :class="{ 'is-invalid': submitted && !firstName }"
        />
        <div v-show="submitted && !firstName" class="invalid-feedback">First Name is required</div>
      </div>
      <div class="form-group">
        <label for="lastName">Recipeint Last Name</label>
        <input
          type="text"
          v-model="lastName"
          name="lastName"
          class="form-control"
          :class="{ 'is-invalid': submitted && !lastName }"
        />
        <div v-show="submitted && !lastName" class="invalid-feedback">Last Name is required</div>
      </div>
      <div class="form-group">
        <label for="cardPrice">Gift Card Value (INR)</label>
        <input
          type="text"
          v-model="cardPrice"
          name="cardPrice"
          class="form-control"
          :class="{ 'is-invalid': submitted && !cardPrice }"
        />
        <div
          v-show="submitted && !cardPrice"
          class="invalid-feedback"
        >Gift Card Value (INR) is required</div>
      </div>
      <div class="form-group">
        <label for="commissionPrice" class="form-control">Amount Payable (5% commission inclusive)</label>
        <label for="commissionPrice" class="form-control">
          {{
          commissionPrice
          }}
        </label>
      </div>
      <div class="form-group">
        <div>
          <label for="phoneNumber">Recipeint Mobile Number</label>
          <input
            type="text"
            v-model="phoneNumber"
            name="phoneNumber"
            class="form-control"
            :class="{ 'is-invalid': submitted && !phoneNumber }"
          />
        </div>

        <div v-show="submitted && !phoneNumber" class="invalid-feedback">Recipeint Mobile Number</div>
      </div>
      <div class="form-group">
        <div>
          <label for="address">Address</label>
          <input
            type="text"
            v-model="address"
            name="address"
            class="form-control"
            :class="{ 'is-invalid': submitted && !address }"
          />
        </div>

        <div v-show="submitted && !address" class="invalid-feedback">Address is required</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Place Order</button>
      </div>
    </form>
  </div>
</template>

<script>
import orderservice from "../services/orderservice.js";
import { store } from "../helpers/store.js";
import Navigation from "@/components/Navigation";
const orderStatus = {
  OutDelivery: "OUT FOR DELIVERY",
  Redeemed: "REDEMEED",
  Delivered: "DELIVERED",
};
export default {
  name: "NewOrder",
  components: { Navigation },
  created() {
    if (!store.state.userSession.length) {
      this.$router.push({ name: "Login" });
    }
    var date = new Date();
    this.orderDate = date.toDateString();
  },
  data() {
    return {
      submitted: false,
      orderDate: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      orderData: [],
      cardPrice: 0,
    };
  },
  computed: {
    commissionPrice: function () {
      return (this.cardPrice * 5) / 100;
    },
    activeUserName: function () {
      console.log(store.state.userSession[0]);
      return store.state.userSession[0];
    },
  },
  methods: {
    handleSubmit(e) {
      console.log(e);
      this.submitted = true;
      const { firstName, lastName, cardPrice, phoneNumber, address } = this;
      if (firstName && lastName && cardPrice && phoneNumber && address) {
        orderservice
          .createOrder(
            this.orderDate,
            this.activeUserName,
            firstName,
            lastName,
            cardPrice,
            this.commissionPrice,
            phoneNumber,
            address,
            orderStatus.OutDelivery
          )
          .then((data) => {
            this.orderData = data;
            console.log(data); // now the data is accessable from here.
            this.$router.push({ name: "OrderHistory" });
          })
          .catch(function (response) {
            console.log(response);
          });
      }
    },
  },
};
</script>
