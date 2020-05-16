module.exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify([
      {
        id: 1511997,
        from: "Bugojno",
        to: "Sarajevo",
        datetime: new Date(),
        userId: 1,
        userUsername: "nedim",
        dateOfBirth: new Date(),
        profilePictureUrl:
          "https://pbs.twimg.com/profile_images/803552314195922944/TeXGVOZZ_400x400.jpg",
        price: 5,
        freeSeats: 4,
        note: "Nema pušenja",
      },
      {
        id: 15119971,
        from: "Bihać",
        to: "Sarajevo",
        datetime: new Date(),
        userId: 2,
        userUsername: "zejd",
        dateOfBirth: new Date(),
        profilePictureUrl:
          "https://i.ytimg.com/vi/9vEbIfOeOyc/maxresdefault.jpg",
        price: 5,
        freeSeats: 4,
        note: "Nema turbofolka",
      },
      {
        id: 15119972,
        from: "Sarajevo",
        to: "Konjic",
        datetime: new Date(),
        userId: 2,
        userUsername: "zejd",
        dateOfBirth: new Date(),
        profilePictureUrl:
          "https://i.ytimg.com/vi/9vEbIfOeOyc/maxresdefault.jpg",
        price: 5,
        freeSeats: 4,
        note: "Samo ljbutelje SDA",
      },
    ])
  };
  callback(null, response);
};
