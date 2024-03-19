const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCoupon = async () => {
  const coupon = await stripe.coupons.create({
    name: 'MONTHYL50',
    percent_off: 20,
    duration: 'once',
    applies_to: {
      price
    },
  });

  return coupon;
};

createCoupon().then(coupon => console.log(coupon)).catch(e => console.error(e));
