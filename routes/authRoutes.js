const passport = require('passport')

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }))

    app.get('/auth/google/callback', passport.authenticate('google'))

    app.get('/api/logout', (req, res) => {
        req.logout((err) => {
            if (err) {
              // Handle any error that occurred during logout
              console.error('Error during logout:', err);
              return res.status(500).send('Internal Server Error');
            }
            // Redirect the user to a different page after successful logout
            // res.redirect('/');
            res.send(req.user)
          });
    })


    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })
}