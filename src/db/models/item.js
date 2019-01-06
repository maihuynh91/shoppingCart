'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
     type: DataTypes.STRING,
     allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    } ,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return Item;
};