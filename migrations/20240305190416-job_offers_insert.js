module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('job_offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      employer_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      summary: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jobOffers = require('../job_offers');
    await queryInterface.bulkInsert('job_offers', jobOffers, {});
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('job_offers');
  },
};
