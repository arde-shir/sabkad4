const mongoose = require("mongoose");


const mySchema = new mongoose.Schema({
    BranchName: {
        type: String,
        required: true,
        maxLength:500
    },
    OwnerName: {
        type: String,
        required: true,
        maxLength:1000
    },
    CardNumber: {
        type: String,
        required: true,
        maxLength:20
    },
    AccountNumber: {
        type: String,
        required: true,
        unique : true,
        maxLength:10
    },
    AccountName: {
        type: String,
        required: true,
        maxLength:500
    }
});


const CharityAccount = mongoose.model("CharityAccount", mySchema);

module.exports = CharityAccount;
