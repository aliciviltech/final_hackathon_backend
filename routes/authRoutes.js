import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js';

export const authRoutes = express.Router();


// register / signup / create user in mongoDB
authRoutes.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).send({ message: 'Please fill all the fields' })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).send({ message: 'email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        })
        res.send({ message: 'user created successfully', newUser })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})


// login / get user from mongoDB, find with email
authRoutes.post('/login', async (req, res) => {

    const { email, password, selectedRole } = req.body;
    if (!email || !password ) {
        return res.status(400).send({ message: "Please fill all the fields" })
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send({ message: "User not found" })
    }
    if (user.role !== selectedRole ) {
        return res.status(400).send({ message: `${selectedRole} with this email does not exist` })
    }
    const isValidPassword = await bcrypt.compare(password, user?.password);
    if (!isValidPassword) {
        return res.status(400).send({ message: "Invalid password" })
    }
    if (user) {
        // const token = jwt.sign({id:user._id}, process.env.JWT_TOKEN);
        res.status(200).send({ message: "Login successful", user: user })
    }

})


// get single user data from mongo db find with id
authRoutes.get('/get_user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const activeUser = await User.findById(id);
        res.status(200).send({ message: "User data update successful", activeUser })
    } catch (error) {
        res.status(400).send({ message: `Error in getting active user: ${error}` })
    }
})

// update single user data in mongo db
authRoutes.put('/user_update/:id', async (req, res) => {
    const data = req.body;
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, data);
        res.status(200).send({ message: "User data update successful", user: user })
    } catch (error) {
        res.status(400).send({ message: `User data updating error: ${error}` })
    }
})

// logout
authRoutes.post('/logout', (req, res) => {
    res.send('logout')
})

// forget password
authRoutes.post('/forget-password', (req, res) => {
    res.send('forget-password')
})