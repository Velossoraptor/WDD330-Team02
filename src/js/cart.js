import { getLocalStorage, loadHeader, loadFooter } from "./utils.mjs";
import { cartItemTemplate } from "./ShoppingCart.mjs";

const cartFooter = document.querySelector(".cart-footer-hide");

loadHeader();
loadFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  if (cartItems.length !== 0) {
    let total = 0;
    cartItems.map((item) => {
      total += item.FinalPrice;
    });
    cartFooter.innerHTML = `Total: $${total}`;
    cartFooter.classList.remove("cart-footer-hide");
  } else {
    cartFooter.classList.add("cart-footer-hide");
  }
}

renderCartContents();
