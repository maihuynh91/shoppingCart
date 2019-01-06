const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/items/";

const sequelize = require('../../src/db/models/index').sequelize;
const Item = require("../../src/db/models").Item;
const User = require("../../src/db/models").User;

describe("routes : items", () => {

  beforeEach((done) => {
    this.user;
    this.item
    sequelize.sync({force: true}).then(() => {
      User.create({
        email: "mai@gmail.com",
        password: "123456"
      })
      .then((user) => {
        this.user = user;
        Item.create({
          name: "apples",
          description: "gala apples",
          userId: this.user.id
        })
        .then((item) => {
          this.item = item;
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })
  })

  describe("user perform CRUD actions for items", () => {

    beforeEach((done) => {
      User.create({
        email: "admin@example.com",
        password: "password"
      })
      .then((user) => {
        request.get({        
          url: "http://localhost:3000/auth/fake",
          form: {
            userId: user.id,
            email: user.email
          }
        },
          (err, res, body) => {
            done();
          });
      });
    });

    describe("GET /items", () => {
      it("should render all items", (done) => {
        request.get(base, (err, req, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Items");
          expect(body).toContain("apples");
          done();
        });
      });
    });

    describe("GET /items/new", () => {
      it("should render a view with a new item form", (done) => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Item");
          done();
        });
      });
    });

    describe("POST /items/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          name: "aloha",
          description: "hello aloha"
        }
      };
      it("should create a new item and redirect", (done) => {
        request.post(options, 
          (err, res, body) => {
            Item.findOne({where: {name: "aloha"}})
            .then((item) => {
              expect(item).not.toBeNull();
              //expect(res.statusCode).toBe(303);
              expect(item.name).toBe("aloha");
              expect(item.description).toBe("hello aloha");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          });
      });
    });

    describe("GET /items/:id", () => {
      it("should render a view with the selected item", (done) => {
        request.get(`${base}${this.item.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("apples");
          done();
        });
      });
    });

   

  })



});