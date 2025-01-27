'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('type', [
      { id: 1, name: 'NC', created_at: new Date(), updated_at: new Date() },
      { id: 2, name: 'SYNTETIC', created_at: new Date(), updated_at: new Date() },
      { id: 3, name: 'CLEAR', created_at: new Date(), updated_at: new Date() },
    ]);

    await queryInterface.bulkInsert('unit', [
      { id: 1, name: 'KG', created_at: new Date(), updated_at: new Date() },
      { id: 2, name: 'L', created_at: new Date(), updated_at: new Date() },
      { id: 3, name: 'ML', created_at: new Date(), updated_at: new Date() },
    ]);

    await queryInterface.bulkInsert('unit_size', [
      { id: 1, unit_id: 1, name: '20', created_at: new Date(), updated_at: new Date() },
      { id: 2, unit_id: 2, name: '2', created_at: new Date(), updated_at: new Date() },
      { id: 3, unit_id: 3, name: '800', created_at: new Date(), updated_at: new Date() },
      { id: 4, unit_id: 2, name: '1', created_at: new Date(), updated_at: new Date() },
      { id: 5, unit_id: 2, name: '200', created_at: new Date(), updated_at: new Date() },
      { id: 6, unit_id: 3, name: '200', created_at: new Date(), updated_at: new Date() },
      { id: 7, unit_id: 3, name: '100', created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('type',null, {}); 
    await queryInterface.bulkDelete('unit_size', null, {});
    await queryInterface.bulkDelete('unit', null, {});
    await queryInterface.bulkDelete('type', null, {}); 
  },
};
