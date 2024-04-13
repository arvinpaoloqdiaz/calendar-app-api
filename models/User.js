const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "firstName is required!"]
		},
		lastName: {
			type: String,
			required: [true, "lastName is required!"]
		},
		email: {
			type: String,
			required: [true, "email is required!"]
		},
		password: {
			type: String,
			required: [true, "password is required!"]
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		tasksArrayId: {
			type: Array,
			default: []
		},
		partner_id: {
			type: Array,
			default: []
		}
	}

);

module.exports = mongoose.model("User",userSchema);