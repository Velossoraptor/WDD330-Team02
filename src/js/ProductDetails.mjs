import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // Assign the product data to this.product
    this.product = await this.dataSource.findProductById(this.productId);
    // Now that we have the product data, render the details
    this.renderProductDetails();
    // Set up the event listener for the Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addProductToCart(product) {
    const cartItems = getLocalStorage("so-cart") || []; // get existing cart or empty array
    cartItems.push(product); // add new product to cart array
    setLocalStorage("so-cart", cartItems); // save updated cart back to local storage
  }
  async renderProductDetails(product) {
    // use product details to populate the page
    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const img = document.querySelector("img");
    img.src = product.Image;
    img.alt = product.NameWithoutBrand;

    document.getElementById("productPrice").textContent = product.FinalPrice;
    document.getElementById("productColor").textContent =
      product.Colors[0].ColorName;
    document.getElementById("productDesc").textContent =
      product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = product.Id;
  }
}
