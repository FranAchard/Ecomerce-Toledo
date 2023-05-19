import { Router } from "express";
import { createUser, confirm, getUsers, getUser, deleteUser, changePassword, confirmPasswordChange } from "../controllers/userController";

const router = Router();

router.post('/', createUser )
router.get('/confirm/:token', confirm)
router.get('/login', getUser)
router.get('/all', getUsers)
router.delete('/delete/:id', deleteUser)
router.get('/password/reset/:id', changePassword)
router.get('/newPassword/:token', confirmPasswordChange)

export default router