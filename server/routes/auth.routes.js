const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Accept",
      "Content-Type: application/json; charset=UTF-8"
    );

    next();
  });
  app.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  app.post("/signin", controller.signin);
  app.post("/editBio", controller.editBio);
};
