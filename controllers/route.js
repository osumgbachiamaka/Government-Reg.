var express =   require('express')
    router =    express.Router(),
    mongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    Post =      require('../models/postModels'),
    fs = require('fs'),
    fileupload = require('express-fileupload'),
    Pusher = require('pusher');
    router.use(fileupload());
    router.use(express.static("public")),
    multer = require('multer'),
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/uploads')
        },
        filename:(req, file, cb) =>{
            cb(null, file.fieldname + '-' + Date.now())
        }
    }),
    upload = multer({storage:storage})
//========other routes======//
router.get('/', function(req, res){
    res.render('index');
})
router.get('/index', function(req, res){
    res.redirect('/');
})
router.get('/application', function(req, res){
    res.render('application')
})
router.get('/application-:id', isLoggedIn, function(req, res){
    var id = req.params.id;
    Post.findById(id, function(err, retrievedAppl){
        if(!err){
            console.log(retrievedAppl)
            return res.render('single', {user: req.user, allApp: retrievedAppl})
        }
        console.log('error occured while retrieving application ' +err)
    })
})
router.get('/testing', function(req, res){
    res.render('testi');
})
router.get('/uploads:id', function(req, res){
    res.render('');
})
router.get('/admin', isLoggedIn, function(req, res){
    Post.find({}, function(err, allApplications){
        if (err){
            console.log('An Error Occurred');
            return;
        }
        res.render('simple', {user: req.user, allApp: allApplications});
    })
    
})
router.get('/admin-control', isLoggedIn, function(req, res){
    Post.find({}, function(err, allApplications){
        if (err){
            console.log('An Error Occurred');
            return;
        }
        console.log(allApplications)
        res.render('control-panel', {user: req.user, allApp: allApplications});
    })
    
})
router.get('/admin-business', isLoggedIn, function(req, res){
    var business = "Business Interest"
    Post.find({categories: business}, function(err, allApplications){
        if (err){
            console.log('An Error Occurred');
            return;
        }
        res.render('simple', {user: req.user, allApp: allApplications});
    })
})
router.get('/admin-elder', isLoggedIn, function(req, res){
    var elder = "Elders seeking for business opportunities"
    Post.find({categories: elder}, function(err, allApplications){
        if (err){
            console.log('An Error Occurred');
            return;
        }
        res.render('simple', {user: req.user, allApp: allApplications});
    })
})
router.get('/admin-eng', isLoggedIn, function(req, res){
    var eng = "Engineers/Technologists"
    Post.find({categories: eng}, function(err, allApplications){
        if (err){
            console.log('An Error Occurred');
            return;
        }
        res.render('simple', {user: req.user, allApp: allApplications});
    })
})
router.get('/admin-medicine', isLoggedIn, function(req, res){
    var medicine = "Medicine"
    Post.find({categories: medicine}, function(err, allApplications){
        if (err){
            console.log('An Error Occurred');
            return;
        }
        res.render('simple', {user: req.user, allApp: allApplications});
    })
})
router.get('/admin-teacher', isLoggedIn, function(req, res){
    var teacher = "Teachers"
    Post.find({categories: teacher}, function(err, allApplications){
        if (err){
            console.log('An Error Occurred');
            return;
        }
        res.render('simple', {user: req.user, allApp: allApplications});
    })
})
router.get('/admin-trader', isLoggedIn, function(req, res){
    var trader = "Traders"
    Post.find({categories: trader}, function(err, allApplications){
        if (err){
            console.log('An Error Occurred');
            return;
        }
        res.render('simple', {user: req.user, allApp: allApplications});
    })
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

router.get('/newPost', isLoggedIn, function(req, res){
    res.redirect('posts');
})
router.get('/posts',  isLoggedIn, function(req, res){
    Post.find({}, function(err, allPosts){
        if(err){
            console.log('An error occured '+ err);
            return;
        }
        res.render('posts', {user: req.user.name, allPosts: allPosts});
        // console.log(req.body.action)
    })
})

//Show Route
router.get('/posts/:id', isLoggedIn, function(req, res){
    var id = req.params.id;
    Post.findById(id, function(err, returnedPost){
        if(err){
            res.redirect("/posts");
            return;
        } 
        var username = req.user.username,
            retrievedUser = returnedPost.email;
            if(username === retrievedUser){
                res.render("showPost", {user: req.user.name, returnedPost: returnedPost, edit:'1'});
            }
            else{
                res.render("showPost", {user: req.user.name, returnedPost: returnedPost, edit: '0'});
            }  
    })
})


//Edit Route
router.get('/posts/:id/edit', isLoggedIn, function(req, res){
    var id = req.params.id;
    Post.findById(id, function(err, returnedPost){
        if(err){
            res.redirect('/posts')
        }
        else{
            res.render('edit', {user: req.user.name, post: returnedPost})
        }
    })
})

//Update Route
router.put('/posts/:id', isLoggedIn, function(req, res){
    var id = req.params.id,
        data = req.body.post;
    Post.findByIdAndUpdate(id, data, function(err, reupdatedPost){
        if(err){
            console.log(err)
            res.redirect('posts');
        }else{
            res.redirect(id);
        }
        
    })
})

router.delete('/posts/:id', isLoggedIn, function(req, res){
    var id = req.params.id;
    Post.findByIdAndRemove(id, function(err){
        if(err){
            console.log(err)
            res.redirect(id);
            return
        }
        res.redirect('posts');
    })
})

// Show the post of a particular user
router.get('/posts/:id/:user', isLoggedIn, function(req, res){
    var id = req.params.id;
    Post.findById(id, function(err, foundPost){
        if(err){
            console.log(err);
            res.redirect('posts');
            return;
        }
        var email = foundPost.email;
        Post.find({email: email}, function(err, next){
            if(err){
                console.log(err)
                return;
            }
            res.render('user', {allPosts: next, user: req.user});
        })
    })
});

//New Post Route
router.post('/newPost', isLoggedIn, function(req, res){
    var user = req.user,
        name = 'name',
        email = 'email',
        likes_count = 'likes_count';
    var data = req.body.post;
    data[name] = user.name;
    data[email] = user.username;
    data[likes_count] = 0;
    Post.create(data, function(err, postCreated){
        if(err){
            console.log('An error occured '+ err);
            return;
        }
        res.redirect('posts');
        
        
    })
})

router.post('/upload', function(req, res) {
    if (Object.keys(req.files).length == 0) {
      return console.log('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    console.log(req.files)
    let sampleFile = req.files.sampleFile;
    var chi = 'chiamaka';
     var filename = chi + ' ' +sampleFile['name'];
    console.log(filename);
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`./public/uploads/${filename}`, function(err) {
      if (err)
        return console.log(err);
  
      console.log('File uploaded!');
    });
  });

//upload
router.post('/uploadmutter', upload.single('sampleFile'), (req, res, next) =>{
    // MongoClient.connect(url, err, db) => {
    //     assert.equal(null, err);
    //     // insertDocuments(db, 'public/uploads/' + req.file.filename, () =>{
    //     //     db.close()
    //     // })
    //     console.log('upload successfull')

    // }
    console.log(req.files)
      res.redirect('/')
  });
router.post('/upload', function(req, res){
    if (Object.keys(req.files).length == 0) {
        return console.log('No files were uploaded.');
    }
    console.log(req.files.saplFile);


    // var form = new formidable.IncomingForm();
    // form.parse(req, function (err, fields, files) {
    //     var oldpath = files.fileupload.path;
    //     console.log(oldpath)
    //     var newpath = 'public/uploads' + files.fileupload.name;
    //     console.log(newpath)
    //     fs.rename(oldpath, newpath, function (err) {
    //       if (err) throw err;
    //       res.write('File uploaded and moved!');
    //       res.end();
    //     });
    // });
})
//Registration
router.post('/registrationGovern', function(req, res){
//     // console.log(req.files);
    var formApp = req.body.govern;
    // console.log(formApp);
    
// //this is working note oooo
//     if (!req.files){
//         return console.log('No files were uploaded.');
//     }
//     // console.log(req.files)
//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     let cv = req.files['govern[cv]'];
//     console.log(cv);
//     var chi = 'chiamaka';
//     filename = chi + ' ' +cv.name;
//     console.log(filename);

//     // Use the mv() method to place the file somewhere on your server
//     cv.mv(`./public/uploads/${filename}`, function(err) {
//     if (err)
//         return console.log(err);
//     console.log('File uploaded!');
//     });

    // console.log(formApp);
    if(formApp.categories == 'Elders seeking for business opportunities'){
        var elders = req.body.elders;
            formApp['fullname'] = formApp.firstname + ' ' + formApp.middlename + ' ' + formApp.lastname;
            formApp['businessIntrst'] = elders.businessIntrst;
            formApp['businessHwLng'] = elders.businessHwLng;
            formApp['civilServant'] = elders.civilServant;
            formApp['formerWork'] = elders.formerWork;
            formApp['businessLng'] = elders.businessLng;
            formApp['businessNature'] = elders.businessNature;
            formApp['fmlyMembers'] = elders.fmlyMembers;
            formApp['expandBusiness'] = elders.expandBusiness;
            formApp['attractCapital'] = elders.attractCapital;
            formApp['details'] = elders.details;
            formApp['respStateElder'] = elders.respStateElder;
            formApp['respCommElder'] = elders.respCommElder;
            formApp['presentResident'] = elders.presentResident;
            formApp['areaIntEbnyi'] = elders.areaIntEbnyi;
            formApp['assistanceRq'] = elders.AssistanceRq;
            formApp['approvalStatus'] = 0;
        Post.create(formApp, function(err, appCreated){
            if(err){
                console.log('An error occured '+ err);
                return;
            }
            console.log(appCreated);
            res.redirect('/');
        })
        
    }
    else if(formApp.categories == 'Teachers'){
        var teacher = req.body.teacher;
            formApp['fullname'] = formApp.firstname + ' ' + formApp.middlename + ' ' + formApp.lastname;
            formApp['areaofInterest'] = teacher.areaofInterest;
            formApp['schlAttended'] = teacher.schlAttended;
            formApp['gradeObtained'] = teacher.gradeObtained;
            formApp['qualification'] = teacher.qualification;
            formApp['employed'] = teacher.employed;
            formApp['employer'] = teacher.employer;
            formApp['yrWorkExp'] = teacher.yrWorkExp;
            formApp['subject'] = teacher.subject;
            formApp['intrtDvpmt'] = teacher.intrtDvpmt;
            formApp['projectHelp'] = teacher.projectHelp;
            formApp['approvalStatus'] = 0;

            
        Post.create(formApp, function(err, appCreated){
            if(err){
                console.log('An error occured '+ err);
                return;
            }
            console.log(appCreated);
            res.redirect('/');
        })
        console.log(req.body.teacher);
    }
    else if(formApp.categories == 'Engineers/Technologists'){
        var eng = req.body.Eng;
            formApp['fullname'] = formApp.firstname + ' ' + formApp.middlename + ' ' + formApp.lastname;
            formApp['School'] = eng.School;
            formApp['HigherE'] = eng.HigherE;
            formApp['NameSchool'] = eng.NameSchool;
            formApp['CourseStudy'] = eng.CourseStudy;
            formApp['Grade'] = eng.Grade;
            formApp['yearAdmitted'] = eng.yearAdmitted;
            formApp['yearGraduated'] = eng.yearGraduated;
            formApp['degreeObtained'] = eng.degreeObtained;
            formApp['professionalCert'] = eng.professionalCert;
            formApp['Schoolprogram'] = eng.Schoolprogram;
            formApp['certReceived'] = eng.certReceived;
            formApp['employer'] = eng.employer;
            formApp['addressEmployer'] = eng.addressEmployer;
            formApp['jobTitle'] = eng.jobTitle;
            formApp['nameSupervisor'] = eng.nameSupervisor;
            formApp['supervisorPhone'] = eng.supervisorPhone;
            formApp['dateStarted'] = eng.dateStarted;
            formApp['dateEnded'] = eng.dateEnded;
            formApp['uniqueAchievements'] = eng.uniqueAchievements;
            formApp['currentlyDoing'] = eng.currentlyDoing;
            formApp['assistanceNeeded'] = eng.assistanceNeeded;
            formApp['businessPlan'] = eng.businessPlan;
            formApp['yourAchievement'] = eng.yourAchievement;
            formApp['referralName'] = eng.referralName;
            formApp['referralPhone'] = eng.referralPhone;
            formApp['referralRelationship'] = eng.referralRelationship;
            formApp['approvalStatus'] = 0;

            
        Post.create(formApp, function(err, appCreated){
            if(err){
                console.log('An error occured '+ err);
                return;
            }
            console.log(appCreated);
            res.redirect('/');
        })
    }
    else if(formApp.categories == 'Medicine'){
        var medicine = req.body.medicine;
        console.log(formApp.middlename)
            formApp['fullname'] = formApp.firstname + ' ' + formApp.middlename + ' ' + formApp.lastname;
            formApp['SchoolAt'] = medicine.SchoolAt;
            formApp['schlAttended'] = medicine.schlAttended;
            formApp['yrGrad'] = medicine.yrGrad;
            formApp['AreaSpec'] = medicine.AreaSpec;
            formApp['completedInternship'] = medicine.completedInternship;
            formApp['ProfWrkExp'] = medicine.ProfWrkExp;
            formApp['VolWrkExp'] = medicine.VolWrkExp;
            formApp['license'] = medicine.license;
            formApp['areaIntrst'] = medicine.areaIntrst;
            formApp['governmentHelp'] = medicine.governmentHelp;
            formApp['approvalStatus'] = 0;

            
        Post.create(formApp, function(err, appCreated){
            if(err){
                console.log('An error occured '+ err);
                return;
            }
            console.log(appCreated);
            res.redirect('/');
        })
    }
    else if(formApp.categories == 'Traders'){
        var trader = req.body.trader;
            formApp['fullname'] = formApp.firstname + ' ' + formApp.middlename + ' ' + formApp.lastname;
            formApp['yrstrading'] = trader.yrstrading;
            formApp['learnUnderSomeone'] = trader.learnUnderSomeone;
            formApp['duration'] = trader.duration;
            formApp['learn'] = trader.learn;
            formApp['tradeLine'] = trader.tradeLine;
            formApp['exportingImporting'] = trader.exportingImporting;
            formApp['dollarsHow'] = trader.dollarsHow;
            formApp['receiveMoney'] = trader.receiveMoney;
            formApp['sourceGoods'] = trader.sourceGoods;
            formApp['financeDepts'] = trader.financeDepts;
            formApp['howMuch'] = trader.howMuch;
            formApp['growTrade'] = trader.growTrade;
            formApp['learningTrade'] = trader.learningTrade;
            formApp['howmanyYoungP'] = trader.howmanyYoungP;
            formApp['traderEsSDP'] = trader.ESSDP;
            formApp['approvalStatus'] = 0;

            
        Post.create(formApp, function(err, appCreated){
            if(err){
                console.log('An error occured '+ err);
                return;
            }
            console.log(appCreated);
            res.redirect('/');
        })
    }
    else if(formApp.categories == 'Business Interest'){
        var business = req.body.business;
        console.log()
            formApp['fullname'] = formApp.firstname + ' ' + formApp.middlename + ' ' + formApp.lastname;
            formApp['businessInterest'] = business.businessInterest;
            formApp['Qualification'] = business.Qualification;
            formApp['workExper'] = business.workExper;
            formApp['discussWorkExp'] = business.discussWorkExp;
            formApp['businessNature'] = business.businessNature;
            formApp['succeChall'] = business.succeChall;
            formApp['peopleProject'] = business.peopleProject;
            formApp['mentored'] = business.mentored;
            formApp['remarkproject'] = business.remarkproject;
            formApp['entInterest'] = business.entInterest;
            formApp['businessEBSDP'] = business.EBSDP;
            formApp['presResident'] = business.presResident;
            formApp['approvalStatus'] = 0;

            
        Post.create(formApp, function(err, appCreated){
            if(err){
                console.log('An error occured '+ err);
                return;
            }
            console.log(appCreated);
            res.redirect('/');
        })
    }
})

//configuring pusher

var pusher = new Pusher({
    appId: '684513',
    key: 'e492b1dfd182dd30fde2',
    secret: '0b8854ba6990061eb678',
    cluster: 'eu',
    encrypted: true
  });

//Adding route for liking post
router.post('/posts/:id/act', (req, res, next) => {
    var action = req.body.action,
        id = req.params.id,
        counter = action === 'Like' ? 1 : +1;
    Post.update({_id: id}, {$inc: {likes_count: counter}}, function(err, numberAffected){
        if(err){
            console.log('error occurred '+ err);
            return;
        }
        pusher.trigger('post-events', 'postAction', { action: action, postId: id }, req.body.socketId);
        res.send('');
    });
});
module.exports = router;