// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key); // get the list of products in the cart
  try { // try to parse the data...if none is found, return an empty array
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
export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// New function to render a list with a template
export function renderListWithTemplate(TemplateFn, parentElement, list, position = "afterbegin", clear = false) {
  if(clear) parentElement.innerHTML = "";
    const html = list.map(TemplateFn);
    parentElement.insertAdjacentHTML(position, html.join(""));
}

// New function to create alerts at the top of the main element
export function alertMessage(message, scroll = true) {
  // Create alert container
  const alert = document.createElement('div');
  alert.classList.add('alert');

  // Create message span
  const msgSpan = document.createElement('span');
  msgSpan.textContent = message;

  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  closeBtn.setAttribute('aria-label', 'Close alert');
  closeBtn.classList.add('alert-close');
  
  // Append message and close button to alert
  alert.appendChild(msgSpan);
  alert.appendChild(closeBtn);

  // Add click listener to close button
  alert.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('alert-close')) {
      alert.remove();
    }
  });

// Insert alert at the top of the main element
  const main = document.querySelector('main');
  main.prepend(alert);

  // Optionally scroll to top to show the alert
  if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
}