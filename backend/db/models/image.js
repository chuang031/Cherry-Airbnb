'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Spot,{
        foreignKey: 'spotImageId'
      })

      Image.belongsTo(models.Review,{
        foreignKey: 'reviewImageId'
      })


    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull:false
    },
    previewImage: {
      type: DataTypes.BOOLEAN,
      allowNull:true
    },
    reviewImageId: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    spotImageId: {
      type: DataTypes.INTEGER,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};