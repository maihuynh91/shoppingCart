const itemQueries = require("../db/queries.items");

module.exports = {

    index(req, res, next){
      itemQueries.getAllItems(req.user.id,(err, items) => {
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("items/index", {items});
        }
      })
    },

    new(req, res, next){
      res.render("items/new")
    },

    create(req, res, next){
     // console.log(`res is : ${res.json}`)
      let newItem = {
        name: req.body.name,
        description: req.body.description,
        userId: req.user.id //not sent to server
      };
      itemQueries.addItem(newItem, (err, item) => {
        if(err){
          res.redirect(500, "/items/new");
        } else {
          res.redirect(303, `/items/`);
        }
      });
    },

    show(req, res, next){
      itemQueries.getItem(req.params.id, (err, item) => {
        if(err || item == null){
          res.redirect(404, "/");
        } else {
          res.render("items/show", {item});
        }
      });
    },



    destroy(req, res, next){
      itemQueries.deleteItem(req.params.id, (err, item) => {
        if(err){
          res.redirect(500, `/items/${item.id}`)
        } else {
          res.redirect(303, "/items")
        }
      });
    },

    edit(req, res, next){
      itemQueries.getItem(req.params.id, (err, item) => {
        if(err || item == null){
          res.redirect(404, "/");
        } else {
          res.render("items/edit", {item});
        }
      });
    },

    update(req, res, next){

      //#1
           itemQueries.updateItem(req.params.id, req.body, (err, item) => {
      
      //#2
             if(err || item == null){
               res.redirect(404, `/items/${req.params.id}/edit`);
             } else {
               res.redirect(`/items/${item.id}`);
             }
           });
         }

  }