const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code: {
      type:  DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER
    },
    race: {
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal','Other'),
      defaultValue: 'Other'
    },
    hp: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mana: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    date_added: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW  //DataTypes.NOW TOMA LA FECHA ACTUAL
    }
  },{
    timestamps: false,
   })
}