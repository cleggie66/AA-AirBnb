'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId'});
      Spot.hasMany(models.Review, {foreignKey: 'spotId'});
      Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner'});
      Spot.belongsToMany(models.User, {
        through: 'Booking',
        otherKey: 'userId',
        foreignKey: 'spotId'
      });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Spot',
    scopes: {
      allDetails: {
        attributes: {}
      },
      noTimestamps: {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
    }
  });
  return Spot;
};