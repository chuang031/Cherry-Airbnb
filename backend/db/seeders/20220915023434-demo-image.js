'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Images',[
      {
  
        url: "https://a0.muscache.com/im/pictures/81439bfb-0cd3-49bd-82d6-6bffbc123fe0.jpg?im_w=720",
        previewImage: true,
        spotImageId: 1,

        createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
      }
    ])
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete('Images', {}
     , {});
  }
};
