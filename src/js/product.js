// Import necessary modules and functions
import { getParam, loadHeader, loadFooter } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeader();
loadFooter();

// Create a new ExternalServices instance 
const dataSource = new ExternalServices();
// Get the product ID from the URL parameters
const productId = getParam("product");

// Create a new ProductDetails instance and initialize it
const product = new ProductDetails(productId, dataSource);
product.init();

// For testing purposes, log the result of finding a product by ID
// console.log(dataSource.findProductById(productId));
