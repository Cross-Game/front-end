var USERID = Number(sessionStorage.getItem("ID"));
var TOKEN = sessionStorage.getItem("ACESS_TOKEN")
let currentURL = "http://localhost:8080"
let USERNAMESESSION = sessionStorage.getItem("NICKNAME")

export function updateConstants() {
  USERID = sessionStorage.getItem("ID");
  TOKEN = sessionStorage.getItem("ACESS_TOKEN")
}

export { USERID, TOKEN, currentURL ,USERNAMESESSION };