const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/items/";
const sequelize = require("../../src/db/models/index").sequelize;
const Item = require("../../src/db/models").Item;

describe("routes : items", () => {

    beforeEach((done) => {
        this.item;
        sequelize.sync({force: true}).then((res) => {
  
         Item.create({
           name: "banana",
           description: "yello banana",
           price: 5
         })
          .then((item) => {
            this.item = item;
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });  
        });
      });


  describe("GET /items", () => {

    it("should return a status code 200 and all items", (done) => {
        request.get(base, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(err).toBeNull();
            expect(body).toContain("Items");
            expect(body).toContain("banana");
            done();
          });
    
    });

  });
});