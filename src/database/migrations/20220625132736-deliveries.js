'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('deliveries', {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      order_uuid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'orders',
          key: 'uuid'
        }
      },
      delivery_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      vehicle_uuid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'vehicles',
          key: 'id'
        }
      },
      delivery_stage_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'delivery_stage_codes',
          key: 'id'
        }
      },
      delivery_address_uuid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'customer_addresses',
          key: 'uuid'
        }
      },
      driver_employee_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'employees',
          key: 'id'
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
    })

    await queryInterface.addConstraint(
      'deliveries', //nombre de la tabla
      {
        fields: ['uuid'],//columnas que tendran esta restriccion
        type: 'unique', //restriccion para que los valores sean unicos
        name: 'delivery_uuid' //nombre para guardar el cambio
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
     await queryInterface.dropTable('deliveries');
  }
};
