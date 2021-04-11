const BaseType = require("../model/BaseType");


exports.getfulldata = async (req , res) => {

    try {
        const datas = await BaseType.find();
        res.render("index" , {pageTitle : "فرم شناسه ثابت" , path : "/" , datas});
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

exports.setitem = async (req , res) => {

    if (!req.body) return res.redirect("/");

    const datas = await BaseType.find();
    const errors = [];

    try {
        await BaseType.formValidation(req.body);

        const {code , title} = req.body;

        const dbCode = await BaseType.findOne({code});
        const dbTitle = await BaseType.findOne({title});

        if(dbCode || dbTitle){
            errors.push({message : "این مشخصات در پایگاه داده موجود است"});
            return res.render("index" , {pageTitle : "فرم شناسه ثابت" , path : "/" , datas , errors});

        }
        await BaseType.create({code , title});
        res.redirect("/");
    } catch (err) {
        console.log(err);
        err.inner.forEach( e => {
            errors.push({
                name : e.path ,
                message : e.message
            });
        });
        return res.render("index" , {pageTitle : "فرم شناسه ثابت" , path : "/" , datas , errors});
    }
};

exports.deleteitem = async (req, res) => {
    
    try {
        await BaseType.findByIdAndDelete(req.params.id);

        res.redirect("/");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

exports.edititem = async (req, res) => {

    const datas = await BaseType.find();
    const errors = [];

    try {
        await BaseType.formValidation(req.body);
        
        await BaseType.findByIdAndUpdate(req.params.id , req.body);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        err.inner.forEach( e => {
            errors.push({
                name : e.path ,
                message : e.message
            });
        });
        return res.render("index" , {pageTitle : "فرم شناسه ثابت" , path : "/" , datas , errors});
    }
};

exports.searchitem = async (req , res) => {

    try {
        const fullData = await BaseType.find();
        const {code , title} = req.body;

        if(code && !title){
            
            const searchcode = await BaseType.findOne({code});

            if(searchcode){
                const datas = fullData.filter( (data) => data.code.includes(searchcode.code));
                res.render("index" , {pageTitle : "فرم شناسه ثابت" , path : "/" , datas});
            }else{
                res.send("مقدار کد ورودی اصلا در پایگاه داده موجود نیست");
            }


        } else if(title && !code){

            const searchtitle = await BaseType.findOne({title});

            if(searchtitle){
                const datas = fullData.filter( (data) => data.title.includes(searchtitle.title));
                res.render("index" , {pageTitle : "فرم شناسه ثابت" , path : "/" , datas});
            }else{
                res.send("مقدار عنوان ورودی اصلا در پایگاه داده موجود نیست");
            }


        }else if(code && title){

            const searchcode = await BaseType.findOne({code});
            const searchtitle = await BaseType.findOne({title});
    
            if(searchcode && searchtitle){
                const searchcodeid = searchcode._id;
                const searchtitleid = searchtitle._id;
        
                const codeId = JSON.stringify(searchcodeid);
                const titleId = JSON.stringify(searchtitleid);
                
                if( codeId === titleId ){
                    const datas = fullData.filter( (data) => data.code.includes(searchcode.code));
                    res.render("index" , {pageTitle : "فرم شناسه ثابت" , path : "/" , datas});
                } else{
                    res.send("مقدار کد و عنوان ورودی مربوط به یک شناسه نیست");
                } 
            }else{
                res.send("مقدار کد یا عنوان ورودی اصلا در پایگاه داده موجود نیست");
            } 
        } else{
            res.send("مقدار کد یا عنوان یا هر دو را وارد کنید ");
        } 

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

