//test for root path

const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/"

describe("routes: static", () => {
    describe("GET /", () => {
        it("should return status code 200", (done) => { 
            //We use request to send a GET request to base URL.
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                done();
            });
        });
    });
})