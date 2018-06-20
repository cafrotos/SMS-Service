'use strict';
module.exports = (sequelize, DataTypes) => {
  var integration = sequelize.define('integration', {
    name: DataTypes.STRING,
    token: DataTypes.STRING,
    enable: DataTypes.BOOLEAN
  }, {});
  integration.associate = function(models) {
    // associations can be defined here
  };
  return integration;
};