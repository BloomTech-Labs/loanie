const userControllers = require("../controllers/userControllers");
const loanControllers = require("../controllers/loanControllers");

module.exports = app => {
  app.route("/loans").get(loanControllers.loansGetAll);
  app.route("/newloan").post(loanControllers.loanCreate);
  app.route("/getloan").post(loanControllers.loansGetAllByClientName);
  app
    .route("/loan/:id")
    .get(loanControllers.loanGetById)
    .post(loanControllers.loanEdit)
    .delete(loanControllers.loanDelete);
  app.route("/newuser").post(userControllers.userCreate);
  app.route("/login").post(userControllers.userLogin);
  app.route("/users").get(userControllers.usersGetAll);
  app
    .route("/user/:id")
    .get(userControllers.userGetById)
    .post(userControllers.userEdit)
    .delete(userControllers.userDelete);
};
