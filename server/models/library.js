module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define('Library', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: DataTypes.STRING,
    latitude: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: -90, max: 90 }
    },
    longitude: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: -180, max: 180 }
    }
  }, {
    validate: {
        bothCoordsOrNone: function() {
            if ((this.latitude === null) !== (this.longitude === null)) {
                throw new Error('Require either both latitude and longitude or neither')
            }
        }
    },
    classMethods: {
      associate: (models) => {
        Library.belongsTo(models.User, { as: 'creator' });
        Library.belongsToMany(models.User, { through: 'LibraryAdmin' })
      }
    }
  });
  return Library;
};
