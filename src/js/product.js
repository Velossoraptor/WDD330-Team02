// Import necessary modules and functions
import { getParam, loadHeader, loadFooter } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";

loadHeader();
loadFooter();

// Create a new ProductData instance 
const dataSource = new ProductData();
// Get the product ID from the URL parameters
const productId = getParam("product");

// Create a new ProductDetails instance and initialize it
const product = new ProductDetails(productId, dataSource);
product.init();

// For testing purposes, log the result of finding a product by ID
// console.log(dataSource.findProductById(productId));
