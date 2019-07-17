import config from "./config.js";

export function addCustomer(customer) {
  return fetch(`${config.endpoint}/customers`, {
    method: "POST",
    body: JSON.stringify(customer),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
}

export function getCustomers() {
  return fetch(`${config.endpoint}/customers`).then(res => res.json());
}

export function deleteCustomer(custId) {
  return fetch(`${config.endpoint}/customers/${custId}`, {
    method: "DELETE"
  }).then(res => res.json());
}
