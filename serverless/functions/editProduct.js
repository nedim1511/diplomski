const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.handler = (event, context, callback) => {
  const id = event.queryStringParameters.id;
  const attributes = event.queryStringParameters.attributes;
  const caption = event.queryStringParameters.caption;
  const description = event.queryStringParameters.description;
  const image = event.queryStringParameters.image;
  const url = event.queryStringParameters.url;

  return stripe.products
    .update(id, {
      attributes: [attributes],
      caption: caption,
      description: description,
      images: [image],
      url: url,
    })
    .then(() => {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          data: "Successfully updated",
        }),
      };
      callback(null, response);
    });
};
