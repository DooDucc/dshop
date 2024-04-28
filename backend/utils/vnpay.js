const config = {
  vnp_TmnCode: process.env.VNPAY_TMNCODE,
  vnp_HashSecret: process.env.VNPAY_HASHSECRET,
  vnp_Url: process.env.VNPAY_URL,
  vnp_ReturnUrl: process.env.FE_URL,
};

module.exports = config;
