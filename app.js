var PORT =  process.env.PORT || 3000,
    IP =    process.env.IP,
    express =               require('express'),
    bodyParser =            require('body-parser'),
    methodOverride =        require('method-override'),
    mongoose =              require('mongoose'),
    passport =              require('passport'),
    LocalStrategy =         require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    router =                require('./controllers/route'),
    auth =                  require('./controllers/auth'),
    User =                  require('./models/userModels.')

    mongoose.set('useCreateIndex', true);
    // mongoose.connect("mongodb://localhost/government", { useNewUrlParser:true }).catch()
    mongoose.connect("mongodb://user:slatecubeproject1@ds255403.mlab.com:55403/nodeprojects", { useNewUrlParser:true }, function(err){
        if(err){
            console.log("can't connet to database " + err)
            return;
        }
        console.log("connection successfull");
    }).catch()

var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(require('express-session')({
    secret: "i love coding",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.set('useFindAndModify', false);
app.use(router);
app.use(auth);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(PORT, IP, function(req, res){
    console.log('Server started on port '+ PORT);
})

