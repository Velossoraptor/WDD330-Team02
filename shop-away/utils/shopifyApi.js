const fetch = require("node-fetch");

const SHOPIFY_STORE = process.env.SHOPIFY_STORE_URL;
const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

async function fetchShopifyProductById(id) {
  const url = `https://${SHOPIFY_STORE}/admin/api/2023-10/products/${id}.json`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-Shopify-Access-Token": ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.product || null;
  } catch (error) {
    console.error("Failed to fetch Shopify product:", error);
    return null;
  }
}

module.exports = { fetchShopifyProductById };
