const itemQueries = require("../db/queries.items");
const Authorizer = require("../policies/application");

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
      const authorized = new Authorizer(req.user).new();
      if(authorized) {
        res.render("items/new")
      } else {
        req.flash("notice", "You are not authorized to do that.");
        res.redirect("/");
      }    
    },

    create(req, res, next){
     // console.log(`res is : ${res.json}`)
     const authorized = new Authorizer(req.user).create();
     if(authorized){
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
    }else{
      req.flash("notice", "You are not authorized to do that.");
       res.redirect("/");
    }
    },

    show(req, res, next){
      const authorized = new Authorizer(req.user).show();
      if(authorized){
      itemQueries.getItem(req.params.id, (err, item) => {
        if(err || item == null){
          res.redirect(404, "/");
        } else {
          res.render("items/show", {item});
        }
      });
    }else{
      req.flash("notice", "You are not authorized to do that.");
       res.redirect("/");
    }
    },



    destroy(req, res, next){
      const authorized = new Authorizer(req.user).destroy();
      if(authorized){
      itemQueries.deleteItem(req.params.id, (err, item) => {
        if(err){
          res.redirect(500, `/items/${item.id}`)
        } else {
          res.redirect(303, "/items")
        }
      });
    }else{
      req.flash("notice", "You are not authorized to do that.");
       res.redirect("/");
    }
    },

    edit(req, res, next){
      const authorized = new Authorizer(req.user).edit();
      if(authorized){
      itemQueries.getItem(req.params.id, (err, item) => {
        if(err || item == null){
          res.redirect(404, "/");
        } else {
          res.render("items/edit", {item});
        }
      });
    }else{
      req.flash("notice", "You are not authorized to do that.");
       res.redirect("/");
    }
    },

    update(req, res, next){
      const authorized = new Authorizer(req.user).update();
      if(authorized){ 
        itemQueries.updateItem(req.params.id, req.body, (err, item) => {

  //#2
          if(err || item == null){
            res.redirect(404, `/items/${req.params.id}/edit`);
          } else {
            res.redirect(`/items/${item.id}`);
          }
        });
      }else{
        req.flash("notice", "You are not authorized to do that.");
         res.redirect("/");
      }
    } 

  }