const userControllers = require("../controllers/userControllers");
const loanControllers = require("../controllers/loanControllers");

module.exports = (app) => {
  // Returns all loans in the database. This is just for manual debugging,
  // frontend should never need to user it.
  app.route("/loans").get(loanControllers.loansGetAll);

  // Creates a new loan. Creates a new row for the loan in Loan collection.
  app.route("/newloan").post(loanControllers.loanCreate);

  // Returns all loans for the given clientId.
  app.route("/getclientloans").post(loanControllers.loansGetAllByClientId);

  // Returns all loans for the given loanManagerId.
  app.route("/getmanagerloans").post(loanControllers.loansGetAllByManagerId);

  // Performs get/post/delete operations on the given loan.
  app
    .route("/loan/:id")
    .get(loanControllers.loanGetById)
    .post(loanControllers.loanEdit)
    .delete(loanControllers.loanDelete);

  // Creates a new user. Creates a new row for the user in User collection.
  app.route("/newuser").post(userControllers.userCreate);

  // Checks log in credentials for a user.
  app.route("/login").post(userControllers.userLogin);

  // Returns all users in the database. This is just for manual debugging,
  // frontend should never need to user it.
  app.route("/users").get(userControllers.usersGetAll);

  // Performs get/post/delete operations on the given user.
  app
    .route("/user/:id")
    .get(userControllers.userGetById)
    .post(userControllers.userEdit)
    .delete(userControllers.userDelete);

  // Recieve client token after authentication

  app.route("/auth").post(userControllers.userToken);
  app.route("/stripe").post(userControllers.stripeTransaction);
};
