const mongoose = require("mongoose");
const Yup = require('yup');



const mySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        maxLength : 3
    },
    title: {
        type: String,
        required: true,
        maxLength : 800
    },
    commonBaseData: [
        {
        type: mongoose.Schema.Types.ObjectId ,
        ref : "BaseData"
        }
    ]
});



//! validator
const validateSchema = Yup.object().shape({
    code : Yup.string().required(" وارد کردن کد الزامی است")
               .max( 3 , "حداکثر طول مجاز سه عدد میباشد"),
    title : Yup.string().required(" وارد کردن عنوان الزامی است")
              .max( 800 , "حداکثر طول مجاز 800 حرف میباشد"),
});

mySchema.statics.formValidation = function(body) {
    return validateSchema.validate(body , {abortEarly: false})
};
//! end of validator

const BaseType = mongoose.model("BaseType", mySchema);

module.exports = BaseType;

