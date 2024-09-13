import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  
    name:{//done
        type:String,
        required:true
        },
    applicationId:{
        type:String,
        required:true,
        unique:true

    },
    number:{//done
        type:String,
        required:true
    },
    number2:{//done
        type:String
    },
    rNumber:{//done
        type:String,
        required:true,
    },
    city:{//done
        type:String,
        required:true,
    },
    vName:{//done
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
    roi:{//done
        type:String,
        required:true
    },

    cAddress:{//done
        type:String,

    },
    otherbank:{
        type:String
    },
    femi:{//done
        type:Date,
    },
    lAmount:{
        type:String,
    },

    flat:{
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

