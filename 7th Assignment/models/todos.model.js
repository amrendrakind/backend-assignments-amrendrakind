module.exports = (sequelize, Sequelize) => {
   const todoModel = sequelize.define("todoModel", {
      username: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      isComplete: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      }  

    });
    return todoModel;
  };