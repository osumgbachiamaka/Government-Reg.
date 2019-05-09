var express =   require('express')
    router =    express.Router(),
    passport =  require('passport')
    User =      require('../models/userModels.');



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
//========get======//
//========authentication======//

router.get('/login', function(req, res){
    res.render('login');
})
router.get('/ra', function(req, res){
    res.render('register');
})
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
})

router.get('/admin-password', isLoggedIn, function(req, res){
    res.render('change-password')
})
router.get('/create-admin', isLoggedIn, function(req, res){
    res.render('create-admin')
})
//========post======//

router.post('/create-admin', isLoggedIn, function(req, res){
    var oldAdmin = req.body.admin;
    User.find({username: oldAdmin.username}, function(err, all){
        if(err){
            console.log('Error occurred')
        }
        else if(all.length == 0){
             var creatAdmin = req.body.admin;
            User.register(new User({name: creatAdmin.name, username: creatAdmin.username, status: 2}), creatAdmin.password, function(err, newAdmin){
                if(err){
                    return console.log('An Error occurred ' + err)
                }
                res.redirect('/admin');
            })
        }
        else{
            console.log('Name already existing in Database ' + err)
        }
    })
    // 
    // res.render('create-admin')
})
router.post('/update-password', isLoggedIn, function(req, res){
    var id = req.user.id,
    newPassword = req.body.admin.newPassword;
    User.findByIdAndUpdate(id, newPassword, function(err, updateP){
        if(err){
            return console.log('error occured while updating password ' + err)
        }
        console.log('password updated ' + updateP)
        return res.redirect('/admin-password')
    })
})

router.post('/register', function(req, res){
    var userDetails = req.body;
    User.register(new User({name: userDetails.name, username: userDetails.username, status: 1}), userDetails.password, function(err, user){
        if(err){
            console.log(err)
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/admin-control");
        })
    })
})

// //using passport.authenticate as middleware
router.post('/login', passport.authenticate("local",{
    successRedirect: '/admin-control',
    failureRedirect: '/login',
}),function(req, res){

})

module.exports = router;
