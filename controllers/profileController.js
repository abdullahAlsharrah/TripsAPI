const { Profile, Trip, User } = require("../db/models");

exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};
exports.profileUpdate = async (req, res, next) => {
  try {
    console.log(req.profile);
    if (req.user.id === req.profile.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
      req.body.userId = req.user.id;
      await req.profile.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

// exports.myProfile = async (req, res, next) => {
//   try {
//     if (req.user.id === req.profile.userId) {
//       const foundTrips = await Trip.findAll({
//         where: { userId: req.user.id },
//         include: {
//           model: User,
//           as: "user",
//           attributes: ["username"],
//         },
//       });
//       const myProfile = {
//         id: req.profile.id,
//         image: req.profile.image,
//         bio: req.profile.bio,
//         userId: req.profile.userId,
//         trips: foundTrips,
//         createdAt: req.profile.createdAt,
//         updatedAt: req.profile.updatedAt,
//       };
//       res.json(myProfile);
//       next();
//     } else {
//       const err = new Error("Unauthorized");
//       err.status = 401;
//       next(err);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// exports.profile = async (req, res, next) => {
//   try {
//     const foundTrips = await Trip.findAll({
//       where: { userId: req.profile.id },
//       include: {
//         model: User,
//         as: "user",
//         attributes: ["username"],
//       },
//     });
//     const profile = {
//       id: req.profile.id,
//       image: req.profile.image,
//       bio: req.profile.bio,
//       userId: req.profile.userId,
//       trips: foundTrips,
//       createdAt: req.profile.createdAt,
//       updatedAt: req.profile.updatedAt,
//     };
//     res.json(profile);
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
exports.profileList = async (req, res, next) => {
  try {
    const profiles = await Profile.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["username", "lastName", "firstName"],
      },
    });
    res.json(profiles);
    next();
  } catch (error) {
    next(error);
  }
};
