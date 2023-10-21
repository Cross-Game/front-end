// const AMBIENTE = "desenvolvimento"
const AMBIENTE = "producao"




var USERID = Number(sessionStorage.getItem("ID"));
var TOKEN = sessionStorage.getItem("ACESS_TOKEN")
let currentURL = ""
let URLSITE = ""
let USERNAMESESSION = sessionStorage.getItem("NICKNAME")

AMBIENTE === "desenvolvimento" ? currentURL = "http://localhost:8080" : currentURL = "https://matchmakingapi.sytes.net";
AMBIENTE === "desenvolvimento" ? URLSITE = "http://localhost:3000" : URLSITE = "https://cross-game.sytes.net";

export function updateConstants() {
  USERID = Number(sessionStorage.getItem("ID"));
  TOKEN = sessionStorage.getItem("ACESS_TOKEN")
  USERNAMESESSION = sessionStorage.getItem("NICKNAME");
}

export { USERID, TOKEN, currentURL, USERNAMESESSION, URLSITE };