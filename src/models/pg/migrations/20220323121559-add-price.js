'use strict';

module.exports = {
  async up(query, transaction) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const sql = `
      ALTER TABLE "Coin"
      ADD price VARCHAR(255);
    `;
    await transaction.sequelize.query(sql, { raw: true, transaction });
  },

  async down() {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
