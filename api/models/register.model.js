import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  
    name:{
        type:String,
        required:true
        },
    applicationId:{
        type:String,
        required:true,
        unique:true

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
    },
    hAmount:{
        type:String,
        required:true,
    },
    lAmount:{
        type:String,
        required:true,
    },
    rStatus:{
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
    lpi:{
        type:String,
        required:true
    },
    moter:{
        type:String,
        required:true
    },
    tloanamount:{
        type:String
    },
    deduction:{
        type:String,
        required:true
    },
    roi:{
        type:String,
        required:true
    },

    cAddress:{
        type:String,

    },
    pAddress:{
        type:String,
    },
    slug:{
        type:String,
        required:true,
        unique: true
    }



    },{timeStamp:true}

);

const Rigistration = mongoose.model("Registration", registerSchema);
 
export default Rigistration;

