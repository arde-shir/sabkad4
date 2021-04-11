const mongoose = require("mongoose");



const mySchema = new mongoose.Schema({
    subcode: {
        type: String,
        required: true,
        maxLength : 6
    },
    subtitle: {
        type: String,
        required: true,
        maxLength : 800
    },
});

const BaseData = mongoose.model("BaseData", mySchema);

module.exports = BaseData;