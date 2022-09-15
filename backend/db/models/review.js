'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.Image, {
        foreignKey: 'reviewImageId'
      })
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    review: {
      type: DataTypes.CHAR,
      allowNull:false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};