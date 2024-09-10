import Registration from '../models/register.model.js'
import { errorHandler } from '../utils/error.js'

export const register = async (req, res, next) => {
    try {
        const {
            name,
            number,
            rNumber,
            city,
            vName,
            bank,
            netDistribution,
            hAmount,
            lAmount,
            rStatus,
            lType,
            rtoCharges,
            cAddress,
            lpi,
            moter,
            tloanamount,
            deduction,
            roi,
            pAddress
        } = req.body;

        // Check if all required fields are provided
        if (!name || !number || !rNumber || !city || !vName || !bank  || !hAmount || !lAmount || !rStatus || !lType || !rtoCharges|| !roi|| !lpi || !moter  || !deduction) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        }
        const generateId = async () => {
            const prefix = 'KF';
            const date = new Date();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear()).slice(-2);
        
            // Count the existing records to determine the next serial number
            const count = await Registration.countDocuments();
            const serial = String(count + 1).padStart(2, '0');
        
            return `${prefix}${month}${year}${serial}`;
        };
        const applicationId = await generateId();

        
        // Generate a slug from the lAmount field
        const slug = lAmount.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');
        console.log(slug)
        

        // Create a new registration object
        const newRegistration = new Registration({
            name,
            number,
            rNumber,
            city,
            vName,
            bank,
            netDistribution,
            hAmount,
            lAmount,
            rStatus,
            lType,
            rtoCharges,
            cAddress,
            pAddress,
            lpi,
            moter,
            tloanamount,
            deduction,
            roi,
            applicationId,
            slug,
        });


        // Save the new registration to the database
        const saveRegister = await newRegistration.save();

        // Respond with the saved registration
        return res.status(201).json({ saveRegister });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
       
    }
}


export const getRegistrationData = async (req, res, next) => {
    try {
        const startIndex =  0;
        const limit = parseInt(req.query.limit) || 10;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const registerData = await Registration.find({
            ...(req.query.registerId && { _id: req.query.registerId }),
            ...(req.query.name && { name: req.query.name }),
            ...(req.query.number && { number: req.query.number }),
            ...(req.query.rNumber && { rNumber: req.query.rNumber }),
            ...(req.query.city && { city: req.query.city }),
            ...(req.query.vName && { vName: req.query.vName }),
            ...(req.query.bank && { bank: req.query.bank }),
            ...(req.query.netDistribution && { netDistribution: req.query.netDistribution }),
            ...(req.query.hAmount && { hAmount: req.query.hAmount }),
            ...(req.query.lAmount && { lAmount: req.query.lAmount }),
            ...(req.query.rStatus && { rStatus: req.query.rStatus }),
            ...(req.query.lType && { lType: req.query.lType }),
            ...(req.query.rtoCharges && { rtoCharges: req.query.rtoCharges }),
            ...(req.query.cAddress && { cAddress: req.query.cAddress }),
            ...(req.query.pAddress && { pAddress: req.query.pAddress }),
            ...(req.query.searchTerm && {
                $or: [
                    { name: { $regex: req.query.searchTerm, $options: 'i' } },
                    { city: { $regex: req.query.searchTerm, $options: 'i' } },
                    { vName: { $regex: req.query.searchTerm, $options: 'i' } }
                ],
            }),
        })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);

        const totalRegistrations = await Registration.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const lastMonthRegistrations = await Registration.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            registerData,
            totalRegistrations,
            lastMonthRegistrations
        });
    } catch (error) {
        next(error);
    }
};
