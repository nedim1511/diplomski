const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.handler = (event, context, callback) => {
  const id = event.queryStringParameters.id;

  return stripe.products
    .update(id, {active: false}).then(() => {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          data: "Successfully deleted",
        }),
      };
      callback(null, response);
    });
};
