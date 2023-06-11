var USERID = Number(sessionStorage.getItem("ID"));
var TOKEN = sessionStorage.getItem("ACESS_TOKEN")
let currentURL = "http://localhost:8080"
// let currentURL = "http://localhost:8081" url para prod
let USERNAMESESSION = sessionStorage.getItem("NICKNAME")

export function updateConstants() {
  USERID = Number(sessionStorage.getItem("ID"));
  TOKEN = sessionStorage.getItem("ACESS_TOKEN")
  USERNAMESESSION = sessionStorage.getItem("NICKNAME");
}

export { USERID, TOKEN, currentURL ,USERNAMESESSION };