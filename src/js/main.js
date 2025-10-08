import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

const externalServices = new ExternalServices("tents");
const productList = new ProductList(
  "tents",
  productData,
  document.querySelector(".product-list"),
);
productList.init();


