import {Router} from "express";
import {UserController}  from '../controllers/UserController';
import passport from "passport";


const router = Router()
const auth = passport.authenticate('jwt', {session: false})

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/user', auth, UserController.readUser);
router.get('/user/:userId', UserController.updateUser);
router.delete('/user/:userId', UserController.deleteUser);

//rota de teste para pegar os IDs, pode ser apagada depois
//router.get("/users", UserController.readAllUsers);

export default router;