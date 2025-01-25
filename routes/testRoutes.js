import express from 'express'
import { Test } from '../models/test';

export const testRoutes = express.Router();

testRoutes.post('/post-test', async(req,res)=>{
    const data = req.body;
    const testData = await Test.create(data)
    res.status(200).send({message:'success', data:testData})
})