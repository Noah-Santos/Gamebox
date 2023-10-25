const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

router.get('/login', (req, res)=>{
    res.render('pages/login')
})
router.get('/register', (req, res)=>{
    res.render('pages/register')
})
router.get('/game', (req,res)=>{
    res.render('pages/game')
})
router.get('/dashboard', (req,res)=>{
    res.render('pages/dashboard')
})

router.post('/register', async(req, res)=>{
    // gets the information from the page
    const {first_name, last_name, email, password, password2} = req.body;
    let errors = [];
    console.log(first_name, last_name, email, password, password2)

    // if all fields are not filled out, then create an error
    if(!first_name || !last_name || !email || !password || !password2){
        errors.push({msg: "Please fill in all fields"})
    }

    // check if the passwords match
    if(password !== password2){
        errors.push({msg: "Passwords do not match"})
    }

    // check if password is less than 6 characters
    // this is where more specific requirements come from
    if(password.length < 6){
        errors.push({msg: "Password needs to be at least 6 characters"})
    }

    // if there are errors, send them back to the register page
    if(errors.length > 0){
        res.render('pages/register', {
            errors: errors,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        })
    } else {
        // makes sure that the email is not already used
        // if so, send them back to the register
        let user = await User.findOne({email: email});
        if(user){
            errors.push({msg: "This email has aleady been registered"})
            res.render('pages/register', {
                errors: errors,
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            })
        } else {
            // if no errors, create the new user
            const newUser = new User({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            })
            
            // used to encrypt the password
            // the 10 defines how many times the password will go through the process to be encrypted
            // 10 is a good number to use
            bcrypt.genSalt(10, (err, salt)=>
                // hash is used to combine the password with characters to encrypt it
                bcrypt.hash(newUser.password,salt,
                    ((err,hash)=> {
                        if(err) throw err;
                        // save the encrypted password to the user information
                        newUser.password = hash
                        // saves the user to mongodb and sends the user to the login page
                        // .save() is a mongo function that saves to the database
                        newUser.save()
                        .then((value)=>{
                            req.flash('success_msg', 'You have now registered!')
                            res.redirect('/users/login')
                        })
                        .catch(value=> console.log("value: yayyyy"))
                    })
                )
            )
        }
        
    }
})

// 
router.post('/login', (req,res,next)=>{
    // passport checks if the user is still logged in
    passport.authenticate('local',{
        // if they are success, send them to the dashboard
        successRedirect: '/dashboard',
        // if unsuccessful, send them to the login page
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req,res,next);
    console.log('logged in')
})

router.get('/logout', (req, res)=>{
    // return error if there is one
    req.logout(function(err){
        if(err) {return next(err)}
    })
    // if no error, send them to the home page
    res.redirect('/')
})

module.exports = router;