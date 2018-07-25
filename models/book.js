
'use strict';

module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title is a required field"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Author is a required field"
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Genre is a required field"
        }
      }
    },
    first_published: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Required field"
        }
      },
      validate: {
        isNumeric: {
          msg: "Published year must be numbers only and in the formet YYYY"
        }
      },
      validate: {
        len: {
          args: [4, 4],
          msg: "Published year must be numbers only and in the formet YYYY"
        }
      },
    }
  }, {
    timestamps: false,
    underscored: true
  });
  Book.associate = function(models) {

    Book.hasMany(models.Loan, {foreignKey: 'book_id'})
  };
  return Book;
};