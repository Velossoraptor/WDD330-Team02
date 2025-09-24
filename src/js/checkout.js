import { getLocalStorage, loadHeader, loadFooter } from "./utils.mjs";

loadHeader();
loadFooter();

const subtotal = document.querySelector(".subtotal");
const tax = document.querySelector(".tax");
const shipping = document.querySelector(".shipping");
const taxableTotal = document.querySelector(".total");

function getSummary() {
  const cartItems = getLocalStorage("so-cart");
  let subTot,
    taxTot,
    shippingTot,
    total = 0;
  if (cartItems.length !== 0) {
    subTot = 0;
    cartItems.map((item) => {
      subTot += item.FinalPrice;
    });
    taxTot = subTot * 0.06;
    shippingTot = 10 + (cartItems.length - 1) * 2;
    total = subTot + taxTot + shippingTot;
  } else {
    subTot, taxTot, shippingTot, (total = 0);
  }
  subtotal.innerHTML = `Subtotal: $${subTot.toFixed(2)}`;
  tax.innerHTML = `Tax: $${taxTot.toFixed(2)}`;
  shipping.innerHTML = `Shipping: $${shippingTot.toFixed(2)}`;
  taxableTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

getSummary();
