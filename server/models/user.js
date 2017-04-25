const sha256 = require('sha256');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM([
        'MALE',
        'FEMALE',
        'OTHERS'
      ]),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      set: function(password) {
        this.setDataValue('password', sha256(password));
      }
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsToMany(models.Library, { through: 'LibraryUser' });
      }
    }
  });
  return User;
};
