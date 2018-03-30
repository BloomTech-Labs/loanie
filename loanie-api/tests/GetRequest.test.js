const request = require("request");

const data = {};

describe("Starting up server", () => {
  describe("Get /users", () => {
    beforeAll((done) => {
      request.get("http://localhost:3030/users", (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });
    it("Status should return 200", () => {
      expect(data.status).toBe(200);
    });
  });
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
});

