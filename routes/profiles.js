const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  profileUpdate,
  fetchProfile,
  myProfile,
  profile,
  profileList,
} = require("../controllers/profileController");
const upload = require("../middleware/multer");

router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfile(profileId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    const err = new Error("Profile Not Found");
    err.status = 404;
    next(err);
  }
});

router.put(
  "/:profileId",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  profileUpdate
);

// router.get(
//   "/my-profile/:profileId",
//   passport.authenticate("jwt", { session: false }),
//   myProfile
// );

router.get("/", profileList);
module.exports = router;
