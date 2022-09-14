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
        type: Sequelize.BLOB
      },
      preview: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      reviewImageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Reviews',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      spotImageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Spots',
          key: 'id'
        },
        onDelete: 'cascade'
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