import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;

function encryptText(plainText: string) {
  const encrypted = CryptoJS.AES.encrypt(plainText, SECRET_KEY).toString();
  return encrypted;
}

function decryptText(encryptedText: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}

export { encryptText, decryptText };
