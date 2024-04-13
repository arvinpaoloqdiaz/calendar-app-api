const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "title is Required!"]
		},
		description: {
			type: String,
			required: [true, "description is Required!"]
		},
		taskType: {
			type:String,
			default: "None"
		},
		userId: {
			type: String,
			required: [true, "user_id is Required!"]
		},
		duration:[
			{
					startDate:{
					type:Date,
					required:[true,"startDate is Required!"]
				}
			},
			{
					endDate:{
					type:Date,
					required:[true,"endDate is Required!"]
				}
			}
		],
		remarks:{
			type: String,
			default: undefined
		}

	}
);

module.exports = mongoose.model("Task", taskSchema);