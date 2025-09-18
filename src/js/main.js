import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeader, loadFooter } from "./utils.mjs";

loadHeader();
loadFooter();


const productData = new ProductData("tents");
const productList = new ProductList(
  "tents",
  productData,
  document.querySelector(".product-list"),
);
productList.init();

// For testing purposes, log the fetched data
// productData.getData().then(data => console.log(data));
