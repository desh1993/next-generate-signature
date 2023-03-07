/**
 * How to Verify Signature & Decrypt data in front end
 */
import React, { useEffect, useState } from "react";
import { privateKey } from "sr-keys/private_key";
import { publicKey } from "sr-keys/public_key";
import CryptoJS from "crypto-js";
import { object } from "yup";

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
  "kgiO2FRSiRetbMB7cgdIDZb4SqJnF0zDoNh7ILIWJNdSeFZ1oQFu8RvxONEZ71NRzvN16qf0pKlWXaNtb5tAlD/JqbkYEXRcYUwHQ37pvYUEFjBWHsYEIQYNaBVI5O23TB5n5DLTF8QO3lcFbq7xEg+okAUs+qiZ9X7QtcsnhVrWOInj6xmimkOQ2VrTe+K3uk8vji6V0ZuZp0dcYDttzucqhzLdbF4phzmYXHSX3IGyeNv4Wy8Tvs1r+mFhkTLIt5RYAbJ2NG1p5tHRGSQhgnYUGQlp7/Ho/4+1Fre5DVWm7eg2R5f84dqj+A+moeCOkmoO79QdJqJAK2DH7ViqJQ==";

const data =
  "mDSCuxTW97rCFLRaPImGpqQCMLHnKygZwRjW5MdxpN/jNgUCXe0P8wki8efeKZ6yWVF5b+UEd1WbOWDIMakHqDpU4pv/jnWf9O1bik8/djAkTwzJ0K1h5YwWm35MRZg1Vn00z+HYGSmOJx0Lr9275FFE90unWI4ler9w4eUe9FIweJCSRuA9eQ860uKXeWBHRuQZPYuTetd07sF3jioDCpxjTEhcndLz+otGxUUl65BvtogTWgxh1qA+WLFmTWngasJGglxFK7m/j82CNkDGO7MD+b1YIe3Dv1LutAsMN9w9mp+EGlDKFWKfjmPNdZmmKq3bWbsM1FfsxP/HGITPKw==";

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
