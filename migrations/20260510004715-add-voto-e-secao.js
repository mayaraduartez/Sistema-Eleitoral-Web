'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adiciona votou aos eleitores
    await queryInterface.addColumn('eleitores', 'votou', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    // Se a tabela secao_eleitoral já tiver as colunas, o Sequelize pode reclamar
    // Este bloco garante que as colunas de secao existam conforme o esperado pelo Controller
    const tableInfo = await queryInterface.describeTable('secao_eleitoral');
    
    if (!tableInfo.nro_secao) {
      await queryInterface.addColumn('secao_eleitoral', 'nro_secao', { type: Sequelize.INTEGER });
    }
    if (!tableInfo.nro_local) {
      await queryInterface.addColumn('secao_eleitoral', 'nro_local', { type: Sequelize.INTEGER });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('eleitores', 'votou');
    await queryInterface.removeColumn('secao_eleitoral', 'nro_secao');
    await queryInterface.removeColumn('secao_eleitoral', 'nro_local');
  }
};