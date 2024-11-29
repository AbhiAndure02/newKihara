import express from "express"
import { deleteRegister, getRegistrationData, register, updateRegister } from "../controllers/register.cntroller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/register', register, verifyToken);
router.get('/getregister', getRegistrationData, verifyToken);

router.put('/registrations/:registerId', updateRegister, verifyToken);
router.delete('/deleteData/:registerId', deleteRegister, verifyToken)
export default router;