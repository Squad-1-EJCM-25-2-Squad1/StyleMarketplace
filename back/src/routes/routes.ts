import {Router} from "express";
import {UserController}  from '../controllers/UserController';

const router = Router()

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/user/:userId', UserController.readUser);
router.delete('/user/:userId', UserController.deleteUser);

//rota de teste para pegar os IDs, pode ser apagada depois
//router.get("/users", UserController.readAllUsers);


export default router;