'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Like , Comment }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId'})

      this.hasMany(Like, { foreignKey: 'postId'})

      this.hasMany(Comment, { foreignKey: 'postId'})
    }
  }
  Post.init({
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
    },
    postText: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    // date: {
    //   type: DataTypes.DATE,
    //   allowNull:false
    // },
    // imageURL: {
    //     type: DataTypes.STRING,
    //     allowNull:false
    // },
    // likes: {
    //     type: DataTypes.STRING,
    //     allowNull:false
    // },
    // comment: {
    //     type: DataTypes.STRING,
    //     allowNull:false
    // }
  },{
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
    timestamps: true,
    // alter: true
  });
  return Post;
};