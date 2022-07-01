'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('customer_details', {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'uuid'
        }
      },
      st_customer_id: {
        type: DataTypes.UUID,
        allowNull: true
      },
      st_default_payment_method_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      default_address_uuid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'customer_addresses',
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
      'customer_details', //nombre de la tabla
      {
        fields: ['uuid'],//columnas que tendran esta restriccion
        type: 'unique', //restriccion para que los valores sean unicos
        name: 'customer_details_adress_id' //nombre para guardar el cambio
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
     await queryInterface.dropTable('customer_details');
  }
};
