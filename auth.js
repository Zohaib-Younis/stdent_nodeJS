const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Student = require('./modules/student'); // Ensure this path is correct

// Local Strategy for Passport
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            // Fetch user from the database
            const user = await Student.findOne({ username });
            
            // If user not found, return an error
            if (!user) {
                return done(null, false, { message: 'Authentication failed: Incorrect Username' });
            }

            // Compare the provided password with the stored hashed password
            const isMatchPassword = await user.comparePassword(password);

            // If passwords match, authentication is successful
            if (isMatchPassword) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Authentication failed: Incorrect Password' });
            }
        } catch (err) {
            return done(err);
        }
    }
));

module.exports = passport;
