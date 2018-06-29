'use strict';
module.exports = (sequelize, DataTypes) => {
  var sms_data = sequelize.define('sms_data', {
    tranid: DataTypes.STRING,
    sender: DataTypes.STRING,
    shop_receiver: DataTypes.STRING,
    contents: DataTypes.STRING,
    phone: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  sms_data.associate = function(models) {
    // associations can be defined here
  };
  return sms_data;
};