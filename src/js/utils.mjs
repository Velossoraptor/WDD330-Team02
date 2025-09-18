// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key); // get the list of products in the cart
  try {
    // try to parse the data...if none is found, return an empty array
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : []; // return parsed data if it's an array
  } catch {
    return [];
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// New function to get parameters from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// New function to render a list with a template
export function renderListWithTemplate(
  TemplateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (clear) parentElement.innerHTML = "";
  const html = list.map(TemplateFn);
  parentElement.insertAdjacentHTML(position, html.join(""));
}

// New function to render single opject with a template
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// Loads the contents of a file at "path" and returns it as text
export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

// Function to load the header and footer
export async function loadHeader() {
  const headerTemp = await loadTemplate("../partials/header.html");

  const headerElement = document.querySelector("#main-header");

  renderWithTemplate(headerTemp, headerElement);
}

export async function loadFooter() {
  const footerTemp = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemp, footerElement);
}
