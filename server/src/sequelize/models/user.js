const bcrypt = require('bcrypt');
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post , Like , Comment, Status }) {
      // define association here
      this.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE'})

      this.hasMany(Like, { foreignKey: 'userId'})

      this.hasMany(Comment, { foreignKey: 'userId'})

      this.hasMany(Status, { foreignKey: 'userId'})
    }
  }
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isAlpha: {
          args:true,
          msg: "First name will only allow letters"
        },
        notEmpty: {
          args:true,
          msg: "First name don't allow empty strings"
        },
        len: {
          args: [2, 32],
          msg: "The length of the name is between 2 and 32 characters"
        },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isAlpha: {
          args:true,
          msg: "Last name will only allow letters"
        },
        notEmpty: {
          args:true,
          msg: "Last name don't allow empty strings"
        },
        len: {
          args: [2, 32],
          msg: "The length of the last name is between 2 and 32 characters"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail: {
          args: true,
          msg: "Invalid email format (example@test.com)"
        },
        notEmpty: {
          args:true,
          msg: "Email don't allow empty strings"
        },    
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          args:true,
          msg: "Password don't allow empty strings"
        },          
        len: {
          args: [8, 64],
          msg: "The length of the password is between 8 and 64 characters"
        },
        // is: {
        //   args:[/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,64}$/],
        //   msg: "Min 1 uppercase letter. Min 1 lowercase letter. Min 1 number. Min 1 special character. Min 8 characters. Max 64 characters."
        // }
        //TODO custom validation with bcrypt compare
      }
    }
  },{
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: false,
  });
  return User;
};