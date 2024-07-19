import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
        },
    number:{
        type:String,
        required:true
    },
    rNumber:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    vName:{
        type:String,
        required:true,
    },
    bank:{
        type:String,
        required:true,
    },
    netDistribution:{
        type:String,
        required:true,
    },
    hAmount:{
        type:String,
        required:true,
    },
    lAmount:{
        type:String,
        required:true,
    },
    rstatus:{
        type:String,
        default:"RTO Status",

    },
    lType:{
        type:String,
        default:"Loan Type",   
    },
    rtoCharges:{
        type:String,
        required:true

    },
    cAddress:{
        type:String,

    },
    pAddress:{
        type:String,
    }



    },{timeStamp:true}

);

const Rigistration = mongoose.model("Registration", registerSchema);
 
export default Rigistration;

