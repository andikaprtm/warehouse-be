'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [
      {
        name: 'Admin Gudang',
        username: 'admin_gudang',
        password: '$2b$10$QuTAIST4gHmO.1hL4DCfwu0zHkSEcYzieSpBITNUhuAX9eIhwpLpe',
        role: 1, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Admin Kantor',
        username: 'admin_kantor',
        password: '$2b$10$QuTAIST4gHmO.1hL4DCfwu0zHkSEcYzieSpBITNUhuAX9eIhwpLpe', 
        role: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the users inserted above
    await queryInterface.bulkDelete('user', {
      username: ['admin_gudang', 'admin_kantor'],
    });
  },
};
