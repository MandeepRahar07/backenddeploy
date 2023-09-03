const mongoose = require("mongoose");


const TaskSchema = mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, enum : ["pending", "completed"],required: true },
    category: { type: String, required: true },
    user_id : {type : String,required: true }
})

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = {
    TaskModel
};
 