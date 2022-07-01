'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('employees', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uuid'
        }
      },
      other_details: {
        type: DataTypes.TEXT,
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
      'employees', //nombre de la tabla
      {
        fields: ['id'],//columnas que tendran esta restriccion
        type: 'unique', //restriccion para que los valores sean unicos
        name: 'employees_personal_id' //nombre para guardar el cambio
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
     await queryInterface.dropTable('employees');
  }
};
