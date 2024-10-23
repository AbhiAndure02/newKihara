import express from "express"
import { getRegistrationData, register, updateRegister } from "../controllers/register.cntroller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/register', register);
router.get('/getregister', getRegistrationData);

router.put('/registrations/:registerId', updateRegister)
export default router;