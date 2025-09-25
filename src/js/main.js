import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeader, loadFooter } from "./utils.mjs";

loadHeader();
loadFooter();

const externalServices = new ExternalServices("tents");
const productList = new ProductList(
  "tents",
  externalServices,
  document.querySelector(".product-list"),
);
productList.init();

// For testing purposes, log the fetched data
// externalServices.getData().then(data => console.log(data));
