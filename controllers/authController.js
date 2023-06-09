const signin = async (req, res) => {
    res.json({});
}

const signup = (req, res) => {    
    res.json({});
}

const isAuthenticatedMiddleware  = (req, res, next) => {
    next();
}

module.exports = {
    signin,
    signup,
    isAuthenticatedMiddleware
}
