const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  const token = requestBody.token.id;
  const email = requestBody.token.email;
  const name = requestBody.token.ime;

  const currency = requestBody.order.currency;
  const items = requestBody.order.items;
  const shipping = requestBody.order.shipping;

  // Create a customer for the order
  return stripe.customers
    .create({
      email: email,
      name: name,
    })
    .then((customer) => {
      // Add a card to a customer so an order can be created
      return stripe.customers
        .createSource(customer.id, { source: token })
        .then((card) => {
          // Create order
          return stripe.orders
            .create({
              currency: currency,
              items: items,
              shipping: shipping,
              email: email,
              customer: customer.id,
            })
            .then((order) => {
              // Pay for the order
              return stripe.orders
                .pay(order.id, {
                  customer: customer.id,
                })
                .then((order) => {
                  // Success
                  const response = {
                    statusCode: 200,
                    headers: {
                      "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                      message: `Order processed succesfully!`,
                      order,
                    }),
                  };
                  callback(null, response);
                });
            })
            .catch((err) => {
              console.log(err);
              const response = {
                statusCode: 500,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                  error: err.message,
                }),
              };
              callback(null, response);
            });
        })
        .catch((err) => {
          console.log(err);
          const response = {
            statusCode: 500,
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              error: err.message,
            }),
          };
          callback(null, response);
        });
    })
    .catch((err) => {
      console.log(err);
      const response = {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: err.message,
        }),
      };
      callback(null, response);
    });
};
