import { getLocalStorage, loadHeader, loadFooter } from "./utils.mjs";
import { cartItemTemplate } from "./ShoppingCart.mjs";

loadHeader();
loadFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

renderCartContents();
