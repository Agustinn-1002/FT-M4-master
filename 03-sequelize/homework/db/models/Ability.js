const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
     name: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: 'dataUnique'
     },
    description:{
      type: DataTypes.TEXT,
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      unique: 'dataUnique',
      allowNull: false
    }
  })
}