'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('customer_addresses', {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      line_1: {
        type: DataTypes.STRING,
        allowNull: false
      },
      line_2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      line_3: {
        type: DataTypes.STRING,
        allowNull: true
      },
      line_4: {
        type: DataTypes.STRING,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zip_postcode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state_province: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      longitude: {
        type: DataTypes.REAL,
        allowNull: true
      },
      latitude: {
        type: DataTypes.REAL,
        allowNull: true
      },
      other_details: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uuid'
        }
      },
      createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'created_at'
      },
      updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'updated_at'
      }
    });
    await queryInterface.addConstraint(
      'customer_addresses', //nombre de la tabla
      {
        fields: ['uuid'],//columnas que tendran esta restriccion
        type: 'unique', //restriccion para que los valores sean unicos
        name: 'customer_addresses_user_id' //nombre para guardar el cambio
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('customer_addresses');
  }
};
