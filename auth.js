const jwt = require("jsonwebtoken");

const secret = "mycalendarapp";

module.exports.createAccessToken = (user) => {

	const data ={
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	return jwt.sign(data, secret, {});
};

module.exports.verify = (req,res,next) => {

	let token = req.headers.authorization;

	if(typeof token == "undefined"){
		return res.status(401).send({auth:false});
	} else {
		token = token.slice(7, token.length);

		jwt.verify(token, secret, function(err, decodedToken){

			if(err){
				return res.status(401).send({
					auth:"Failed",
					message: err.message
				});
			} else {
				req.user = decodedToken

				next()
			}
		})
	}
};

module.exports.verifyAdmin = (req, res, next) => {

	if(req.user.isAdmin){
		next()
	} else {
		return res.status(401).send({
			auth:"Failed",
			message: "You are not Admin!"
		})
	}
}