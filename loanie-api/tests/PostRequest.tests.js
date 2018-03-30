const request = require("request");

const data = {};

describe("Starting up server", () => {
  describe("Post /newuser", () => {
    const formData = {
      // need actual client and manager data to pass this test as mongo will never find 1 or 2.
      firstName: "John",
      lastName: "Doe",
      password: "password12345",
      userType: "manager",
      email: "john4doe@email.com",
      mobilePhone: 1234567890,
      acceptTexts: true,
      acceptEmails: true,
      subscriptionEndDate: "08/23/2019",
    };
    beforeAll((done) => {
      request.post({ url: "http://localhost:3030/newuser", formData }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it("Status should return 200", () => {
      expect(data.status).toBe(200);
    });
  });
  describe("Post /newloan", () => {
    const formData = {
      // need actual client and manager data to pass this test as mongo will never find 1 or 2.
      clientId: "1", currentStatus: "step 1", timestamp: "01/02/2013", loanManagerId: "2",
    };
    beforeAll((done) => {
      request.post({ url: "http://localhost:3030/newloan", formData }, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it("Status should return 200", () => {
      expect(data.status).toBe(200);
    });
  });
});

