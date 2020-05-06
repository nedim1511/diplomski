const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  const token = requestBody.token.id;
  const email = requestBody.token.email;

  const currency = requestBody.order.currency;
  const items = requestBody.order.items;
  const shipping = requestBody.order.shipping;

  return stripe.orders.create({
    currency: currency,
    items: items,
    shipping: shipping,
    email: email
  }).then((order) => {

    return stripe.orders.pay(order.id, {
      source: token
    }).then((order) => {

      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: `Order processed succesfully!`,
          order,
        }),
      };
      callback(null, response);

    })
  })
  .catch((err) => {
    console.log(err);
    const response = {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: err.message,
      }),
    };
    callback(null, response);
  })
};