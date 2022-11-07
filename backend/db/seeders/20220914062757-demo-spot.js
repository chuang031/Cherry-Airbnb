"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Spots", [
      {
        userId: 1,
        address: "344 Fremont St.",
        city: "Woodstock",
        state: "Illinois",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Cherry's Inn",
        description: "This is a real place lol",
        price: 123,
        previewImage:
          "https://www.enjoyillinois.com/assets/Tourism-Operators/images/CTExterior.jpg",
      },
      {
        userId: 1,
        address: "123 Yummy Lane",
        city: "Pump Kin",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Pumpkin Pie",
        description: "Cool pumkin house! Pls book!",
        price: 500,
        previewImage:
          "https://ih0.redbubble.net/image.6935477.1403/flat,800x800,075,f.jpg",
      },
      {
        userId: 1,
        address: "222 Underwater Dr",
        city: "Pacific City",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Spongebob's Crib",
        description: "Who lives in a pineapple under the sea?",
        price: 900,
        previewImage:
          "https://static.readytotrip.com/upload/information_system_24/1/0/8/item_1080741/information_items_1080741.jpg",
      },
      {
        userId: 1,
        address: "123 Avo Street",
        city: "Cedar City",
        state: "Utah",
        country: "United States of America",
        lat: 37.71,
        lng: -12.477,
        name: "Avocado Cottage",
        description: "Come get your avocuddles here!",
        price: 300,
        previewImage:
          "https://a0.muscache.com/im/pictures/56467892-0d23-4ab1-8302-9c3d0d5e52cd.jpg?im_w=1200",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("Spots", {}, {});
  },
};
