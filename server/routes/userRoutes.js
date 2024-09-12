const express = require('express');
const { register,login, getAllUsers, updateUser,userDelete} = require('../controllers/userCltr'); 
const userCltr = require('../controllers/userCltr');
const userRouter = express.Router();


userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/all-users',getAllUsers)
userRouter.put('/update',updateUser)
userRouter.delete('/delete',userDelete)
module.exports = userRouter;
