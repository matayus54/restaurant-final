'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('orders', {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      user_uuid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'uuid'
        }
      },
      st_order_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      st_customer_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      st_customer_payment_method_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'order_statuses',
          key: 'id'
        }
      },
      sub_total: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      discount: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      tax: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      shipping: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      promo_code: {
        type: DataTypes.STRING,
        allowNull: true
      },
      total: {
        type: DataTypes.DECIMAL,
        allowNull: true
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
      'orders', //nombre de la tabla
      {
        fields: ['uuid'],//columnas que tendran esta restriccion
        type: 'unique', //restriccion para que los valores sean unicos
        name: 'order_uuid' //nombre para guardar el cambio
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
     await queryInterface.dropTable('orders');
  }
};
