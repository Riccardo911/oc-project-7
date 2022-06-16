'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
    },
    text: {
        type: DataTypes.STRING,
        allowNull:false
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull:false
    },
    likes: {
        type: DataTypes.STRING,
        allowNull:false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull:false
    }
  },{
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
    timestamps: false,
    alter: true
  });
  return Post;
};