import axios from "axios";
import { privateKey } from "staging-keys/private_key";
import { publicKey } from "staging-keys/public_key";
import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function Encrypt(form) {
  //import library
  const JSEncrypt = (await import("jsencrypt")).default;
  let encrypt = new JSEncrypt();
  //get Public Key
  encrypt.setPublicKey(publicKey);
  //Convert object to string then base64 string
  let data = btoa(JSON.stringify(form));
  //Encrypting the base64 string
  let encrypted = encrypt.encrypt(data);
  return encrypted;
}

const API_URL = "https://staging.eforestapi.com/api/bstill/signature/verify";

/**
 *
 * @param {*} form
 * form will contain
 * - venderOrderId which is randomly generated string
 * - timestamp which is in unix format
 * - price which is the price of the song etc
 * - origin which is in url but encoded
 *
 * @returns
 */
async function generateSignature(form) {
  //import library
  const JSEncrypt = (await import("jsencrypt")).default;
  const data = await Encrypt(form); //form is an object
  const sign = new JSEncrypt();
  sign.setPrivateKey(privateKey);
  const signature = sign.sign(data, CryptoJS.SHA256, "sha256");
  return {
    data,
    signature,
  };
}

const index = () => {
  //must send in origin as well
  const [form, setForm] = useState({
    venderOrderId: makeid(15),
    timestamp: Math.floor(Date.now() / 1000).toString(),
    price: 10.5,
    origin: "",
  });

  const [response, setResponse] = useState(null);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      origin: encodeURIComponent(window.location.href),
    }));
  }, []);

  //Submiting to Laravel's api (change api_url)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await generateSignature(form);
      if (result) {
        let obj = {
          data: result?.data,
          signature: result?.signature,
        };
        setResponse(obj);

        //send api to laravel
        const signatureData = await axios.post(
          API_URL,
          {
            data: result?.data,
          },
          {
            headers: {
              "content-type": "application/json",
              "x-api-signature": result?.signature,
            },
          }
        );
        console.log(signatureData);
        if (signatureData) {
          const { data } = signatureData;
          console.log(data.signed_url);
          console.log(signatureData.data);
          window.open(data.signed_url, "_blank"); //open login page in new tab
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h3>Pay By Eforest</h3>
      </div>
      {response && (
        <div>
          <div>
            <label>Data:</label>
            <textarea
              id="noter-text-area"
              name="textarea"
              value={response.data}
              disabled
            />
          </div>
          <div>
            <label>Signature:</label>
            <textarea
              id="noter-text-area"
              name="textarea"
              value={response.signature}
              disabled
            />
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>venderOrderId : </label>
            <input
              type="text"
              name="venderOrderId"
              value={form.venderOrderId}
              disabled
            />
          </div>
          <div>
            <label>Price : </label>
            <input
              type="text"
              name="venderOrderId"
              value={form.price}
              disabled
            />
          </div>
          <div>
            <label>Encoded Origin url : </label>
            <input type="text" name="origin" value={form.origin} disabled />
          </div>
          <div>
            <label>Timestamp : </label>
            <input
              type="text"
              name="timestamp"
              value={form.timestamp}
              disabled
            />
          </div>
        </div>
        <button>Pay By Eforest</button>
      </form>
    </>
  );
};

export default index;
