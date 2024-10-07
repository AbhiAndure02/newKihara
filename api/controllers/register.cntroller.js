import Registration from '../models/register.model.js'
import { errorHandler } from '../utils/error.js'

export const register = async (req, res, next) => {
    try {
        // Extract fields from the request body
        const {
            name,
            number,
            number2,
            rNumber,
            city,
            vName,
            bank,
            netdesb,
            hAmount,
            lAmount,
            rStatus,
            lType,
            rtoCharges,
            cAddress,
            otherbank,
            lpi,
            moter,
            tloanamount,
            deduction,
            roi,
            sname,
            newCarD,
            prHold,
            pfc,
            pnoc,
            ppBank,
            pnpt,
            pcustomerPay,
            prtoCharges,
            prtoAgent,
            pkiharas,
            rnoc1,
            rpBank1,
            rfc1,
            rcustomerPay1,
            rrHold1,
            rrtoCharges1,
            rkiharas1,
            bpBank1,
            bfc2,
            boAmount,
            bcustomerPay2,
            brHold2,
            brtoCharges2,
            brAgent,
            bkiharas2,
            flat,
            pf,
            vc,
            sd,
            document,
            other
        } = req.body;

        // Validate required fields
        if (!name || !number || !rNumber || !city || !vName || !bank  || !lAmount || !rStatus || !lType  || !roi || !lpi || !moter || !deduction) {
            return res.status(400).json({ error: 'Please fill all the required fields' });
        }

        // Generate unique applicationId
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
        const slugBase = `${name} ${lAmount}`;
        const slug = slugBase
            .toLowerCase()
            .split(' ')
            .join('-')
            .replace(/[^a-z0-9-]/g, '-');
        console.log(slug)
        // Create a new registration document
        const newRegistration = new Registration({
            name,
            number,
            number2,
            rNumber,
            city,
            vName,
            bank,
            netdesb,
            hAmount,
            lAmount,
            rStatus,
            lType,
            rtoCharges,
            cAddress,
            otherbank,
            lpi,
            moter,
            tloanamount,
            deduction,
            roi,
            sname,
            newCarD,
            prHold,
            pfc,
            pnoc,
            ppBank,
            pnpt,
            pcustomerPay,
            prtoCharges,
            prtoAgent,
            pkiharas,
            rnoc1,
            rpBank1,
            rfc1,
            rcustomerPay1,
            rrHold1,
            rrtoCharges1,
            rkiharas1,
            bpBank1,
            bfc2,
            boAmount,
            bcustomerPay2,
            brHold2,
            brtoCharges2,
            brAgent,
            bkiharas2,
            flat,
            pf,
            vc,
            sd,
            document,
            other,
            applicationId,
            slug
        });

        // Save the new registration document to the database
        await newRegistration.save();

        // Respond with the created registration
        res.status(201).json(applicationId);
    } catch (error) {
        // Pass errors to Express error handler
        next(error);
    }
};

export const getRegistrationData = async (req, res, next) => {
    try {
        const startIndex =  0;
        const limit = parseInt(req.query.limit) || 10;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const registerData = await Registration.find({
            ...(req.query.registerId && { _id: req.query.registerId }),
            ...(req.query.name && { name: req.query.name }),
            ...(req.query.applicationId && { applicationId: req.query.applicationId }),
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
                    { applicationId:{ $regex: req.query.searchTerm, $options:'i'}}
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
