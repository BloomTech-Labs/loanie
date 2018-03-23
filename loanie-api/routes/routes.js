const userControllers = require("../controllers/userControllers");
const loanControllers = require("../controllers/loanControllers");

module.exports = app => {
  app.route("/loans").get(loanControllers.loansGetAll);
  // app.route('/likes').post(loanControllers.postAddLike);
  // app.route('/comment').post(loanControllers.postAddComment);
  app.route("/newloan").post(loanControllers.loanCreate);
  app
    .route("/loan/:id")
    .get(loanControllers.loanGetById)
    .post(loanControllers.loanEdit);

  app.route("/newuser").post(userControllers.userCreate);
  app.route("/login").post(userControllers.userLogin);
  app.route("/users").get(userControllers.usersGetAll);
};
