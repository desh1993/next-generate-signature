/**
 * How to Verify Signature & Decrypt data on front end
 */
import React, { useEffect, useState } from "react";
import { privateKey } from "sr-keys/private_key";
import { publicKey } from "sr-keys/public_key";
import CryptoJS from "crypto-js";

async function Decrypt(encrypted) {
  const JSEncrypt = (await import("jsencrypt")).default;
  let encrypt = new JSEncrypt();
  encrypt.setPrivateKey(privateKey);
  const decrypted = encrypt.decrypt(data);
  const obj = JSON.parse(atob(decrypted));
  return obj;
}

async function verifySignature(data, signature) {
  const JSEncrypt = (await import("jsencrypt")).default;
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  const isVerified = encrypt.verify(data, signature, CryptoJS.SHA256);
  return isVerified;
}

const signature =
  "WK3T1S1sNG6r08DsIinQ67dI2vZMyC3tdmscqRDyicwTf9wKpkYJy5pYhz+w1WEHKKA+tm3BqUe0VSOXX5IIGT9JRxwPdhaleehnF+78AlH37I8X90+pAP9SItUFTecN5u9nXwYLUjoFP6nnW5Dx34kfPA/bq+7TTzW2ha2onzzGdCL5j0//IWwFq5cTnTVE9+x9vuYg80JUVBqauEpS7HdG6bVMrIHJPenRGAddtJuUUL4B/sA1RqYUPuhtFKHkDXhqAFr0TUZz0ZNoP0jZyDB1VryCwfTFnCRFtmrC76vks9hv6bSUhraq10O5YyV/ar38rC+bDyn8nLv6PoEelA==";
const data =
  "uxTjlOeU55rJsxJHjrd/fOYrGA8jRwPsySZDUK3+mOTvkM4NBp7ecXLkHxY26qE9L2PJYD0s+Y0v3Nj92SzWxf7FKJD5CUR4TalbGOTeKjxDVe05l1fBmygCFaKyBkBHnSetEPID3C2Z7Fj1d4jbVR9h7hejARxVVhVBIftbavai5ZAJv7UhZGI20ykM98UThgGypMqL8veIDg8x3jS7265u0oHb1AZ23Zpc7MlmKPgEQnczLigrER7vYev5Gkhz6cKW1CvkE0t3V8BoF9CXIlMW4zrH5jHmIBG3ULadCJhZ7g47XQSQUbYOMxZHaf7bnlhh/ZdNvEIcl2hutW4scA==";

const decrypt = () => {
  const [obj, setobj] = useState(null);
  useEffect(() => {
    verifySignature(data, signature).then((isVerified) => {
      if (isVerified) {
        return Decrypt(data).then((base64string) => {
          setobj(base64string);
        });
      }
      return console.log("Signature Invalid");
    });
  }, []);

  return (
    <div>
      <h4>Decrypt</h4>
      {obj && <div>{JSON.stringify(obj)}</div>}
    </div>
  );
};

export default decrypt;
