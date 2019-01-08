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
        request.get({
          url: "http://localhost:3000/auth/fake",
             form: {
               userId: user.id,
               email: user.email
             }
        })
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

    describe("GET /items", () => {
      it("should render all items", (done) => {
        request.get(base, (err, req, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Items List");
          expect(body).toContain("apples");
         //expect(body.indexOf("Items List") > -1).toBe(true)
         //console.log("req: " + JSON.stringify(req))
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
 
      it("should create a new item and redirect", (done) => {
        const options = {
          url: `${base}create`,
          form: {
            name: "blink-182 songs",
            description: "What's your favorite blink-182 song?"
          }
        };
        request.post(options,
          (err, res, body) => {
            Item.findOne({where: {name: "blink-182 songs"}})
            .then((item) => {
              expect(item).not.toBeNull();
              expect(err).toBeNull();
              expect(item.name).toBe("blink-182 songs");
              expect(item.description).toBe("What's your favorite blink-182 song?");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });

      it("should not create a new item that validates the validations", (done) => {
        const options = {
          url: `${base}create`,
          form: {
            name: "",
            description: "hello"
          }
        };
        request.post(options, 
          (err, res, body) => {
            Item.findOne({where: {description: "hello"}})
            .then((item) => {
              expect(item).toBeNull();
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

    describe("POST /items/:id/destroy", () => {
      it("should delete item with the associated id", (done) => {
        Item.all()
        .then((item) => {
          const itemCountBeforeDelete = item.length;

          expect(itemCountBeforeDelete).toBe(1);
          request.post(`${base}${this.item.id}/destroy`, (err, res, body)=> {
            Item.all()
            .then((item) => {
              expect(err).toBeNull();
              expect(item.length).toBe(itemCountBeforeDelete-1);
              done();
            });
          });
        });
      });
    });

    describe("GET /items/:id/edit", () => {
      it("should render a view with an edit item form", (done) => {
        request.get(`${base}${this.item.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).not.toBeNull()
          expect(body).toContain("Edit Item");
          expect(body).toContain("apples");
          expect(body).toContain('value="false" selected')
          done();
        });
      });
    });

    describe("POST /items/:id/update", () => {
      it("should update item with the given value", (done)=> {
        const options = {
          url: `${base}${this.item.id}/update`,
          form: {
            name: "Fuji Apples",
            description: "Crunchy and fresh apples",
            status: true
               }
            };
        request.post(options, 
          (err, res, body) => {
            expect(err).toBe(null);
            Item.findOne({
              where: {id: 1}
            })
            .then((item) => {
              expect(err).toBeNull();
              expect(item.name).toBe("Fuji Apples");
              expect(item.description).toBe("Crunchy and fresh apples");
              expect(item.status).toBe(true);
              done();
            })
          })
    })
    })
  })



});