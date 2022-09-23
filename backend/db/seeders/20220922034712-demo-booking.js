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

    await queryInterface.bulkInsert('Bookings',[{
     
      spotId: 1,
      userId: 1,
      startDate: "2021-11-19 20:39:36",
      endDate: "2021-11-20 20:39:36",
    }

  ]

    
    
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */    await queryInterface.bulkDelete('Bookings',{},{})
  
  }
};
