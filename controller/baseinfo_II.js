const BaseType = require("../model/BaseType");
const BaseData = require("../model/BaseData");


exports.getfulldata = async (req , res) => {

    try {
        
        const datas = await BaseType.findOne({_id : req.params.id}).populate("commonBaseData").exec();

        await BaseData.create({subcode : "001001" , subtitle : "test1-1"});


        console.log(datas.commonBaseData);
        console.log(datas);

        res.render("getEach" , {pageTitle : "فرم مقادیر ثابت" , path : "/geteach/" , datas});
        
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

