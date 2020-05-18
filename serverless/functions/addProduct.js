const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.handler = (event, context, callback) => {
  const name = event.queryStringParameters.name;
  const attributes = event.queryStringParameters.attributes;
  const caption = event.queryStringParameters.caption;
  const description = event.queryStringParameters.description;
  const images = event.queryStringParameters.images.split(",");
  const url = event.queryStringParameters.url;
  const price = +event.queryStringParameters.price * 100;

  return stripe.products
    .create({
      name: name,
      attributes: [attributes],
      caption: caption,
      description: description,
      images: images,
      type: "good",
      url: url,
    })
    .then((product) => {
      // Create a SKU
      return stripe.skus
        .create({
          price: price,
          product: product.id,
          inventory: { type: "infinite" },
          currency: "bam",
        })
        .then((skuRes) => {
          // Assign a SKU back to the product
          return stripe.products
            .update(product.id, {
              attributes: [skuRes.id]
            })
            .then(() => {
              const response = {
                statusCode: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                  data: "Successfully added a product",
                }),
              };
              callback(null, response);
            });
        });
    });
};
