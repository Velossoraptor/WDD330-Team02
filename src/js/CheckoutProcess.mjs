import { getLocalStorage } from "./utils.mjs";

const subtotal = document.querySelector(".subtotal");
const tax = document.querySelector(".tax");
const shipping = document.querySelector(".shipping");
const taxableTotal = document.querySelector(".total");

export default class CheckoutProcess {
  constructor(key) {
    this.key = key;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
  }

  calculateItemSubtotal() {
    if (this.list.length !== 0) {
      this.list.map((item) => {
        this.itemTotal += item.FinalPrice;
      });
    }
    subtotal.innerHTML = `Subtotal (${this.list.length} Items): $${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    tax.innerHTML = `Tax: $${this.tax.toFixed(2)}`;
    shipping.innerHTML = `Shipping: $${this.shipping.toFixed(2)}`;
    taxableTotal.innerHTML = `Total: $${this.orderTotal.toFixed(2)}`;
  }
}
