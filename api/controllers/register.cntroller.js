import Registration from '../models/register.model.js'
import { errorHandler } from '../utils/error.js'

export const register = async (req, res, next) => {
    const { name, number, rNumber, city, vName, bank, netDistribution, hAmount, lAmount, rStatus, lType, rtoCharges, cAddress, pAddress } = req.body;

    try {
        if (!name || !number || !rNumber || !city || !vName || !bank || !netDistribution || !hAmount || !lAmount || !rStatus || !lType || !rtoCharges || !cAddress || !pAddress) {
            return next(errorHandler(400, 'Please fill all the fields'));
        }

        const newRegistration = new Registration({
            name, number, rNumber, city, vName, bank, netDistribution, hAmount,
            lAmount, rStatus, lType, rtoCharges, cAddress, pAddress,
        });
        
        await newRegistration.save();
        
        return res.status(201).json({ message: 'Registration successful', data: newRegistration });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}


export const getRegistrationData = async(req,res,next) =>
{
    try {

        const registerData = await Registration.find({registerId: req.params._id}).sort({
            createdAt: -1,
        })
        res.status(200).json(registerData);
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
        
    }
}