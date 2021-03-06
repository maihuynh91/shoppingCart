module.exports = {
    validateItems(req, res, next) {
 
      if(req.method === "POST") {
  
       // req.checkParams("itemId", "must be valid").notEmpty().isInt();
       req.checkBody("name", "must not be empty").notEmpty();
        req.checkBody("description", "must be at least 2 characters in length").isLength({min: 2});
      }
  
      const errors = req.validationErrors(); // gather any validation errors.
  
      if (errors) {
        req.flash("error", errors);
        return res.redirect(303, req.headers.referer)
      } else {
        return next();
      }
    },

    validateUsers(req, res, next) {
      if(req.method === "POST") {
 
        req.checkBody("email", "must be valid").isEmail();
        req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
        req.checkBody("password", "must have no spaces.").custom(value => !/\s/.test(value))
      
        req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
      }
 
      const errors = req.validationErrors();
 
      if (errors) {
        req.flash("error", errors);
        return res.redirect(req.headers.referer);
      } else {
        return next();
      }
    }

  }