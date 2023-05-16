import { Router } from "express";
import { createUser, confirm, getUsers, getUser, deleteUser } from "../controllers/userController";

const router = Router();

router.post('/', createUser )
router.get('/confirm/:token', confirm)
router.get('/all', getUsers)
router.delete('/delete/:id', deleteUser)

export default router