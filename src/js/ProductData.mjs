const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    // if (!category || typeof category !== "string") { // validate category input
    //   throw new Error("ProductData: A valid category string is required!");
    // }
    // this.category = category;
    // this.path = `/json/${this.category}.json`;
  }
  async getData(category) {
    // fetches product data from the specified JSON file
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
    // return fetch(this.path)
    //   .then(convertToJson)
    //   .then((data) => data);
  }
  async findProductById(id) {
    // new method to find a product by its ID
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
