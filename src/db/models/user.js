'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Item, {
      foreignKey: "userId",
      as: "items"
    })
  };
  return User;
};