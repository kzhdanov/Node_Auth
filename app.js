var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var conf = require('./config');
var pool = mysql.createPool(conf);
var Users = require('./Models/Users')(pool);
var Passwords = require('./Models/Password')(pool);
var ErrorController = require('./Controllers/Error');
var HomeController = require('./Controllers/Home');
var templating = require('consolidate');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passHash = require('password-hash');

app.engine('hbs', templating.handlebars);
app.set('view options', { layout: 'layout' });
app.set('view engine', 'hbs');
app.set('views', __dirname + '/Views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('express-session')({
    secret: "@keyCryptoToketOloloFatality2009-2016@",
    resave: true,
    saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    },
    function (username, password, done) {
        Users.SelectOne(username, function(err, user) {
            if(err) throw err; 
            if(user && user.length > 0 && user[0].Id) {
                Passwords.CheckPassword(user[0].Id, function(err, pwd) {
                    if(err) throw err; 
                    if(pwd && pwd[0].SolePsd) {
                        if(passHash.verify(password, pwd[0].SolePsd)) {    
                            return done(null, user[0]); 
                        }
                        else {
                            return done(null, false, { "message": "User not found." });
                        }
                    }
                }); 
            }
            else
               return done(null, false, { "message": "User not found." }); 
        });
    })
);
passport.serializeUser(function (user, done) {
    done(null, user.Id);
});
passport.deserializeUser(function (id, done) {
    Users.SelectOneById(id, function(err, user) {
        if(err) throw err; 
        done(null, user[0].Login);
    })
});

app.get('/', HomeController.Index);

app.post('/login',  
    passport.authenticate("local", { failureRedirect: "/?error=AuthError" }),
    function (req, res) {
        var hour = 3600000;
        req.session.cookie.expires = new Date(Date.now() + hour);
        req.session.cookie.maxAge = hour;
        res.redirect('/content');
    }
);

app.get("/content", isLoggedIn, function (req, res) {
    res.send("Congratulations! you've successfully logged in.");
});
app.post('/logout', HomeController.LogOut);

app.all('/*', isLoggedIn);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.sendStatus(401);
}
app.listen(4000);