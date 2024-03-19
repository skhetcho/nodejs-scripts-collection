const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


async function tokenize() {
    const token = await stripe.tokens.create({
        card: {
          number: '4540331796838017',
          exp_month: 2,
          exp_year: 2024,
          cvc: '391',
        },
      });
      return token
}
tokenize().then((t) => {
    console.log(t)
})