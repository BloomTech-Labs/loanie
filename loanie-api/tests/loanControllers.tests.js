const request = require("request");
const loanControllers = require("../controllers/loanControllers");

const data = {};

describe("Starting up server", () => {
  describe("Get /loans", () => {
    beforeAll((done) => {
      request.get("http://localhost:3030/loans", (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });
    it("Status should return 200", () => {
      expect(data.status).toBe(200);
    });
  });

  describe("Post /newloan", () => {
    beforeAll((done) => {
      spyOn(loanControllers, "loanCreate");
      loanControllers.loanCreate();
      done();
    });
    it("tracks that the spy was called", () => {
      expect(loanControllers.loanCreate).toHaveBeenCalled();
    });
  });

  describe("Post /getclientloans", () => {
    beforeAll((done) => {
      spyOn(loanControllers, "loansGetAllByClientId");
      loanControllers.loansGetAllByClientId();
      done();
    });
    it("tracks that the spy was called", () => {
      expect(loanControllers.loansGetAllByClientId).toHaveBeenCalled();
    });
  });

  describe("Post /getmanagerloans", () => {
    beforeAll((done) => {
      spyOn(loanControllers, "loansGetAllByManagerId");
      loanControllers.loansGetAllByManagerId();
      done();
    });
    it("tracks that the spy was called", () => {
      expect(loanControllers.loansGetAllByManagerId).toHaveBeenCalled();
    });
  });

  describe("Get /loan/:id", () => {
    beforeAll((done) => {
      request.get("http://localhost:3030/loan/5abece41ba16143fa098eb26", (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });
    it("Status should return 200", () => {
      expect(data.status).toBe(200);
    });
  });

  describe("Post /loan/:id", () => {
    beforeAll((done) => {
      spyOn(loanControllers, "loanEdit");
      loanControllers.loanEdit();
      done();
    });
    it("tracks that the spy was called", () => {
      expect(loanControllers.loanEdit).toHaveBeenCalled();
    });
  });

  describe("Delete /loan/:id", () => {
    beforeAll((done) => {
      spyOn(loanControllers, "loanDelete");
      loanControllers.loanDelete();
      done();
    });
    it("tracks that the spy was called", () => {
      expect(loanControllers.loanDelete).toHaveBeenCalled();
    });
  });
});
