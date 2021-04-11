const CharityAccount = require("../model/CharityAccount");


exports.getfulldata = async (req , res) => {

    try {
        const datas = await CharityAccount.find();
        res.render("charity_account" , {pageTitle : "حساب های خیریه" , path : "/charity_account" , datas});
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
    
};

exports.setitem = async (req , res) => {

    if (!req.body) return res.redirect("/charity_account");

    try {
        const newItem = {BranchName : req.body.BranchName , OwnerName : req.body.OwnerName ,
            CardNumber : req.body.CardNumber , AccountNumber : req.body.AccountNumber , AccountName : req.body.AccountName};

        await CharityAccount.create(newItem);
        res.redirect("/charity_account");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

exports.deleteitem = async (req, res) => {
    try {
        await CharityAccount.findByIdAndDelete(req.params.id);
        res.redirect("/charity_account");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

exports.edititem = async (req, res) => {
    try {
        let selectedData = await CharityAccount.findByIdAndDelete(req.params.id);

        selectedData = {BranchName : req.body.BranchName , OwnerName : req.body.OwnerName ,
            CardNumber : req.body.CardNumber , AccountNumber : req.body.AccountNumber , AccountName : req.body.AccountName};

        await CharityAccount.create(selectedData);
        res.redirect("/charity_account");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};



