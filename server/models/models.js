const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const bcrypt = require("bcrypt");

const Post = sequelize.define("post", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

const Token = sequelize.define("token", {
  byUser: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  refreshToken: { type: DataTypes.STRING, require: true },
});

const Info = sequelize.define("info", {
  director: { type: DataTypes.JSON },
  //Наименование организации
  nameOfCompany: { type: DataTypes.JSON },
  //Организационно-правовая форма
  organizationalAndLegalForm: { type: DataTypes.JSON },
  //ОГРН/ОГРНИП
  OGRN: { type: DataTypes.JSON },
  //ИНН
  TIN: { type: DataTypes.JSON },
  //Место государственной регистрации юридического лица (место нахождения юридического лица)
  placeOfStateRegistration: { type: DataTypes.JSON },
  email: { type: DataTypes.JSON },
  //Контактные телефоны
  contactPhoneNumber: { type: DataTypes.JSON },
  //Факс
  fax: { type: DataTypes.JSON },
  //Почтовый адрес
  mailingAddress: { type: DataTypes.JSON },
  //Место нахождения органов управления
  locationOfControls: { type: DataTypes.JSON },
  //Контактные телефоны диспетчерской службы
  dispatcherContacts: { type: DataTypes.JSON },
});

const License = sequelize.define("license", {
  //Номер лицензии
  licenseNumber: { type: DataTypes.JSON },
  //Дата получения лицензии
  licenseDate: { type: DataTypes.JSON },
  //Орган, выдавший лицензию
  authorityLicense: { type: DataTypes.JSON },
  //Документ лицензии
  licenseDocument: { type: DataTypes.JSON },
});

const Schedule = sequelize.define("schedule", {
  //Часы работы
  organizationOperatingHours: {
    type: DataTypes.JSON,
  },
  //Перерыв
  breakHour: { type: DataTypes.JSON },
  //личный прием граждан директором
  personalByDirector: {
    type: DataTypes.JSON,
  },
});

const Houses = sequelize.define("houses");

User.beforeCreate(async (user) => {
  user.password = bcrypt.hashSync(user.password, 10);
});

User.hasMany(Post);
Post.belongsTo(User);
Token.belongsTo(User);

module.exports = {
  Post,
  User,
  Token,
  License,
  Schedule,
  Info,
  Houses,
};
