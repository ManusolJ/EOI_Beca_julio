const request = new Request("https://eoi.wiremockapi.cloud/clientes");

const URL = request.url;
const method = request.method;
const credentials = request.credentials;

console.log(URL, method, credentials);