'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('menu' ,  {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },
      menu_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'menu_types',
          key: 'id'
        }
      },
      parent_menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
      'menu', //nombre de la tabla
      {
        fields: ['id'],//columnas que tendran esta restriccion
        type: 'unique', //restriccion para que los valores sean unicos
        name: 'menu_id' //nombre para guardar el cambio
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
     await queryInterface.dropTable('menu');
  }
};
