var express =   require('express')
    router =    express.Router(),
    mongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    Pending=      require('../models/pendingAppModels'),
    Approving =     require('../models/approvedAppModels'),
    fs = require('fs'),
    fileupload = require('express-fileupload'),
    Pusher = require('pusher');
    router.use(fileupload());
    router.use(express.static("public"))

    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/login');
    }

    router.get('/pending-applications', isLoggedIn, function(req, res){
        Post.find({approvalStatus: 1}, function(err, allApplications){
            if (err){
                console.log('An Error Occurred');
                return;
            }
            res.render('simple', {user: req.user, allApp: allApplications});
        })
        
    })
    router.get('/approved-applications', isLoggedIn, function(req, res){
        Post.find({approvalStatus: 2}, function(err, allApplications){
            if (err){
                console.log('An Error Occurred');
                return;
            }
            res.render('simple', {user: req.user, allApp: allApplications});
        })
        
    })
    router.get('/declined-applications', isLoggedIn, function(req, res){
        Post.find({approvalStatus: 3}, function(err, allApplications){
            if (err){
                console.log('An Error Occurred');
                return;
            }
            res.render('simple', {user: req.user, allApp: allApplications});
        })
        
    })

    //posting
    // router.get('/firstApproval', function(req, res){
    //     var data = req.body;
    //     Pending.create(data, function(err, saved){
    //         if(!err){
    //             return res.redirect('/admin')
    //         }
    //         console.log('An error occurred '+err)
    //     })

    // })
    router.get('/FA', function(req, res){
        var id = req.params.id,
            data = req.body;
            console.log(data)
            // data['approvalStatus'] = 1;
            // console.log(data)
        // Post.findByIdAndUpdate(id, {approvalStatus : status}, function(err, reupdatedApp){
        //     if(err){
        //         console.log('error occurred while updating approval' + err)
        //     }else{
        //         console.log(reupdatedApp)
        //         res.redirect('admin');
        //     }
        // })
    })
    router.post('/application-:id', function(req, res){
        var id = req.params.id,
            data = req.body;
            status = data.approvalStatus;
            data['comment'] = data.comment,
            data['commentUser'] = req.user.username;
            if(status == 0){
                data['approvalStatus'] = 1;
            }
            else if(status == 1){
                data['approvalStatus'] = 2;
            }
            else if(status == 3){
                console.log(data)
            }
            Post.findByIdAndUpdate(id, data, function(err, reupdatedApp){
                if(err){
                    console.log('error occurred while updating approval' + err)
                }else{
                    console.log(reupdatedApp)
                    res.redirect('admin');
                }
            })
    })
    router.get('/SA', function(req, res){
        var id = req.params.id,
            status = 2;
        Post.updateOne({_id: id}, {approvalStatus : status}, function(err, reupdatedApp){
            if(err){
                console.log('error occurred while updating approval' + err)
            }else{
                console.log(reupdatedApp)
                res.redirect('admin');
            }
        })
    })

    module.exports = router;