const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require("bcrypt");

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.TEXT, allowNull: false},
    photo: {type: DataTypes.BLOB, allowNull: true},
    userId:{type: DataTypes.INTEGER, allowNull: false},
});

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    isActivated: {type: DataTypes.BOOLEAN, allowNull: true},
    activationLink: {type: DataTypes.STRING},
})

const Token = sequelize.define('token', {
    byUser: {type: DataTypes.INTEGER, references: { model: User, key: 'id' }},
    refreshToken: {type: DataTypes.STRING, require: true}
})

User.beforeCreate(async (user) => {
    user.password = bcrypt.hashSync(user.password, 10);
});

User.hasMany(Post);
Post.belongsTo(User)
Token.belongsTo(User)

module.exports = {Post, User, Token}