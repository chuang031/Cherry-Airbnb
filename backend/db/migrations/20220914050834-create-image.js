'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      preview: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      reviewImageId: {
        allowNull: true,
        type: Sequelize.INTEGER,
   
      },
      spotImageId: {
        allowNull: true,
        type: Sequelize.INTEGER,
   
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  }
};