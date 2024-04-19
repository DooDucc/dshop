const asyncHandler = require("express-async-handler");
const moment = require("moment");
const Order = require("../models/orderModel");

const createVNPayPayment = (userCart) => {
  const date = new Date();

  const config = require("../utils/vnpay");

  const tmnCode = config.vnp_TmnCode;
  const secretKey = config.vnp_HashSecret;
  let vnpUrl = config.vnp_Url;
  const returnUrl = config.vnp_ReturnUrl;

  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = "VND";
  vnp_Params["vnp_TxnRef"] = moment(date).format("DDHHmmss");
  vnp_Params["vnp_OrderInfo"] =
    "Thanh toan don hang:" + moment(date).format("DDHHmmss");
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = userCart.cartTotal * 100 * 24.5 * 1000;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = "127.0.0.1";
  vnp_Params["vnp_CreateDate"] = moment(date).format("YYYYMMDDHHmmss");

  vnp_Params = sortObject(vnp_Params);
  const querystring = require("qs");
  const signData = querystring.stringify(vnp_Params, { encode: false });

  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf8")).digest("hex");

  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  // res.status(200).json({ paymentUrl: vnpUrl });
  return vnpUrl;
};

const sortObject = (obj) => {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
};

module.exports = { createVNPayPayment };
