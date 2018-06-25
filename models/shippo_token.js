'use strict';
module.exports = (sequelize, DataTypes) => {
  var shippo_token = sequelize.define('shippo_token', {
    name: DataTypes.STRING,
    token: DataTypes.STRING,
    enable: DataTypes.STRING
  }, {});
  shippo_token.associate = function(models) {
    // associations can be defined here
  };
  return shippo_token;
};