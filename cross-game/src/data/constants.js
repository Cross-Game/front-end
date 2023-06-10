var USERID = sessionStorage.getItem("ID");
var TOKEN = sessionStorage.getItem("ACESS_TOKEN")
let currentURL = "http://localhost:8080"

export function updateConstants() {
  USERID = sessionStorage.getItem("ID");
  TOKEN = sessionStorage.getItem("ACESS_TOKEN")
}

export { USERID, TOKEN, currentURL };