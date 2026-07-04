// OAuth 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/auth.model')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback",

  accessToken : 'offline', // Required to get a accessToken
  prompt: 'consent'  //Required to get a refreshToken

},

async (accessToken, refreshToken, Profile, done)=>{
  //Find or create the user in your database:
  const email = profile.emails[0].value;
  let user = await userModel.findOne({email: email});

  if(!user){
    user = await userModel.create({
      name : profile.displayName,
      email: profile.email[0].value,
      googleId: profile.id
    });
  }
  return done(null, user);
}
))