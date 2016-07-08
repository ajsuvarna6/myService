var mongoose      = require('mongoose');
var user         = require('./createUser.js');
var cparser			= require('cookie-parser');
module.exports = function(app) {
	app.use(cparser());

	  app.post("/register",registerUser);

		app.post("/loginUser",loginUser);

		app.get("/users/loggedin/:token",loggedin);

		function registerUser(req,res){
			console.log(req.body);
			var usr = new user(req.body);
			usr.save(function(err){
				var log={
					"flag":true,
					"response":"Registration completed..."
				};
				if(err) { log.response=err; log.flag=false; }
				sendResponse(res,log);
			});
	  }

		function loginUser(req,res){
			console.log(req.body);
			var usr = user.findOne({email:req.body.email,password:req.body.password});
      usr.exec(function(err, user){
				var log={};
        if(user===null) {log.flag=false; log.response=err; log.token=null}
				else {
					var token=""+user._id;
					log={
						"flag":true,
						"response":"Valid user",
						"token":token+token.substring(3,13),
						"username":user.fullname,
						"gender":user.gender,
						"mobile":user.mobile,
						"email":user.email,
						"image":user.image
					}
				}
				if(err) {log.flag=false; log.response=err; log.token=null}
        sendResponse(res,log);
				console.log("token:",log.token);
      });
		}

		function loggedin(req,res){
			var token=req.params.token;
			console.log("tokencheck:",token);
			token=token.substring(0,24);
			console.log("tokencheck2:",token);
			var usr = user.findOne({_id:token});
      usr.exec(function(err, user){
				console.log(user,err);
				var log={
					"flag":true,
					"response":"Valid user"
				}
        if(user===null) {log.flag=false; log.response="invalid user";}
				if(err) {log.flag=false; log.response=err;}
        sendResponse(res,log);
				console.log("token:",log);
      });
		}

		function sendResponse(res,log) {
	    res.statusCode = 200;
	    res.setHeader('Content-Type', 'application/json');
	    res.json(log);
	    res.end();
	  }


    /*app.get('/todos',auth, function(req, res){
        var query = Todo.find({});
        query.exec(function(err, todos){
            if(err)
                res.send(err);
            res.json(todos);
        });
    });
    app.post('/todos', function(req, res){
        var td = new Todo(req.body);
        td.save(function(err){
            if(err)
                res.send(err);
            res.json(req.body);
        });
    });*/
    // app.get('/todos', function(req, res){
    //     var query = Users.findOne({username:req.user.username,password:req.user.password}); //
    //     query.exec(function(err, users){
    //         if(err)
    //             res.send(err);
    //         res.json(users);
    //     });
    // });
    // app.post('/todos', function(req, res){
    // 	Users.findOne({username:req.user.username,password:req.user.password}, function(err, doc){
    // 		doc.todos.push(req.body);
    // 		doc.save(function(err, data){
    //             if(err)
    //                 res.send(err);
    //             res.json(data);
    //         })
    // 	});
    //     //td.todos.push(req.body);
    // });
    // /* update */
    // app.put('/users/todos/:id', function(req, res) {
    // 	Users.findOne({"todos._id":req.params.id}, function(err, doc){
    // 		doc.todos.forEach(function(item){
    // 			if(item.id == req.params.id) {
    // 				item.status = true;
    // 			}
    // 		});
    //         //doc.todos.status = true;
    //         //console.log("aaaaa:",doc);
    //         doc.save(function(err, data){
    //             if(err)
    //                 res.send(err);
    //             res.json(data);
    //         })
    //     });
    // });
    // app.delete('/api/todos/:id', function(req, res) {
    // 	Users.remove({"todos._id" : req.params.id}, function(err, user) {
    //         if (err)
    //             res.send(err);
    //         Users.find(function(err, users) {
    //             if (err)
    //                 res.send(err)
    //             res.json(users);
    //         });
    //     });
    // });
    //
    // app.post('/users/signup', function(req, res){
    //     Users.findOne({username:req.body.username},function(err,user){
    //     	if(user){
    //     		res.json(null);
    //     		return;
    //     	}
    //     	else {
    //     		var us = new Users(req.body);
    //             us.save(function(err,usr){
    //             	req.login(usr,function(err){
    //                 	if(err) { return next(err); }
    //                 	res.json(usr);
    //                 });
    //             });
    //     	}
    //     });
    // });

};
