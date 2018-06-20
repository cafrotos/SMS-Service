'use strict';
module.exports = (sequelize, DataTypes) => {
  var sms_data = sequelize.define('sms_data', {
    sender: DataTypes.STRING,
    shop_receiver: DataTypes.STRING,
    contents: DataTypes.STRING,
    phone: DataTypes.STRING,
    is_sent: DataTypes.BOOLEAN
  }, {});
  sms_data.associate = function(models) {
    // associations can be defined here
  };
  return sms_data;
};