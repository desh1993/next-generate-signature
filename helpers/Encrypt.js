const crypto = require("crypto");
const fs = require("fs");

function encrypt(toEncrypt) {
  //Get Public Key
  const publicKey = fs.readFileSync("./keys/public_key.pem", "utf8");
  //Make it to Buffer
  const buffer = Buffer.from(toEncrypt, "utf8");
  //Takes the Buffer content and encrypt it with public key
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  //Convert it to base 64
  return encrypted.toString("base64");
}

module.exports = {
  encrypt,
};
