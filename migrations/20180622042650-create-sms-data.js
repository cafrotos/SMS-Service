'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sms_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tranid: {
        type: Sequelize.STRING
      },
      sender: {
        type: Sequelize.STRING
      },
      shop_receiver: {
        type: Sequelize.STRING
      },
      contents: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      is_sent: {
        type: Sequelize.BOOLEAN
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sms_data');
  }
};