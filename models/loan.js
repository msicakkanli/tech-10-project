
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('Loan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on:  {
      type: DataTypes.DATEONLY,
      validate : {
        notEmpty : {
          msg: "Loan Date is required field"
        }
      }
    } ,
    return_by:  {
      type: DataTypes.DATEONLY,
      validate : {
        notEmpty : {
          msg: "Return Date is required field"
        }
      }
    } ,
    returned_on:DataTypes.DATEONLY
  }, {
   // timestamps: false,
    // underscored: true
  });
  Loan.associate = function(models) {
    // associations can be defined here
    Loan.belongsTo(models.Book, { foreignKey: "book_id" });
    Loan.belongsTo(models.Patron, { foreignKey: "patron_id" });
  };
  return Loan;
};