'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('product_histories', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'product', // Assuming your product table is named 'product'
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            delivery_order_number: {
                type: Sequelize.STRING(50),
                allowNull: true, // This can be null if not linked to a transaction
            },
            quantity_change: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            reason: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            timestamp: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('product_histories');
    }
};
