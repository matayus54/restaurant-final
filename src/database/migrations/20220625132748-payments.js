'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('payments', {
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      user_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uuid'
        }
      },
      order_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'uuid'
        }
      },
      st_customer_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      st_payment_method: {
        type: DataTypes.STRING,
        allowNull: true
      },
      payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      amount: {
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
      'payments', //nombre de la tabla
      {
        fields: ['uuid'],//columnas que tendran esta restriccion
        type: 'unique', //restriccion para que los valores sean unicos
        name: 'payments_uuid' //nombre para guardar el cambio
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
     await queryInterface.dropTable('payments');
  }
};
