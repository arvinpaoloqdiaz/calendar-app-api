const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const dotenv = require("dotenv");

dotenv.config();

module.exports.registerUser = async ( req, res) => {
	try{

		const existingUser = await User.findOne({ email: req.body.email });

		if (existingUser) {
			return res.status(409).send({
				response:false,
				message:"Email is already in use!"
			})
		}

		let newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10)
		});

		const savedUser = await newUser.save();

		return res.status(201).send({
			response: true,
			message:"Registered Successfully!"
		})

	} catch(error) {
		console.error(error);
		return res.status(500).send({
			message:"Internal Server Error",
			error:error
		})
	}
}

module.exports.loginUser = async ( req, res) => {
	try{

		const registeredUser = await User.findOne({email: req.body.email});

		if(registeredUser === null){
			return res.status(401).send({
				response:false,
				message:"Email is not Registered!"
			})
		}

		const isPasswordCorrect = bcrypt.compareSync( req.body.password, registeredUser.password);

		if(isPasswordCorrect){
			return res.status(201).send({
				response:auth.createAccessToken(registeredUser),
				message:"Login Successfully"
			})
		} else {
			return res.status(401).send({
				response: false,
				message:"Password Incorrect!"
			})
		}

	} catch(error){
		console.error(error);
		return res.status(500).send({
			message:"Internal Server Error",
			error:error
		})
	}
}

module.exports.profile = async (req, res) => {
	try {

		let user = await User.findById(req.user.id);
		 if(user){
		 	return res.status(201).send({
		 		response: user,
		 		message:"User Profile Retrieved!"
		 	})
		 }

		 return res.status(500).send({
		 	response: undefined,
		 	message:"User does not exists!"
		 })

	} catch(error){
		return res.status(500).send({
			message:"Internal Server Error",
			error: error
		})
	}
}

module.exports.getUsers = async (req, res) => {
	try{

		let users = await User.find({});
		if(users){
			return res.status(201).send({
				response: users,
				message:"Users Retrieved!"
			})
		}

		return res.status(500).send({
			response: undefined,
			message: "Users not retrieved!"
		})

	} catch(error){
		console.error(error)
		return res.status(500).send({
			message:"Internal Server Error",
			error:error
		})
	}
}