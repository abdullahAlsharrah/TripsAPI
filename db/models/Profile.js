module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    image: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  });
  return Profile;
};
