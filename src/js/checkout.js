import { loadHeader, loadFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeader();
loadFooter();

const order = new CheckoutProcess("so-cart");
order.init();



document.querySelector("#zip").addEventListener("blur", order.calculateOrderTotal.bind(order));

document.querySelector(".checkout-button").addEventListener("click", (e)=>{
  e.preventDefault();
  const form = document.querySelector(".checkout-form");
  const valid = form.checkValidity();
  form.reportValidity();
  if(valid){
    order.checkout();
  }
});

