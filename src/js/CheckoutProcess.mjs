import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

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

  calculateItemSubTotal() {
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

  async checkout(form) {
    const formElement = document.querySelector(".checkout-form");
    const formData = formDataToJSON(formElement);
    formData["orderDate"] = new Date().toISOString();
    formData["orderTotal"] = this.orderTotal;
    formData["tax"] = this.tax;
    formData["shipping"] = this.shipping;
    formData["items"] = packageItems(this.list);

    try {
      const response = await services.checkout(formData);
      console.log(response);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      console.log(err);
      removeAllAlerts();
        
      if (err.name === "servicesError") {
        const errorData = err.message;

        // Specific fields alerts
        if (errorData.expiration) {
          alertMessage("Invalid expiration date");
        }
        if (errorData.cardNumber) {
          alertMessage("Invalid card number");
        }

        // General string message
        if (typeof errorData === "string") {
          alertMessage(errorData);
        }

        // Catch-all for other fields
        for (let key in errorData) {
          if (key !== "expiration" && key !== "cardNumber") {
            alertMessage(`${key}: ${errorData[key]}`);
          }
        }
      } else {
        alertMessage("An unexpected error occurred. Please try again later.");
      }
    }
  }
}  

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1,
  }));
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}