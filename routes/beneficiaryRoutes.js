import express from 'express'
import { Beneficiary } from '../models/beneficiary.js';

export const beneficiaryRoutes = express.Router();

beneficiaryRoutes.get('/', async(req,res)=>{
    try{
        const allBeneficiaries = await Beneficiary.find();
        res.status(200).send({message:'All Beneficiaries fetched successfully', data:allBeneficiaries})
    }catch(error){
        res.status(400).send({message:`Beneficiaries fetching error at backend: ${error.message}`})
    }
})

// search beneficiary from mongoDB, find with cnic
beneficiaryRoutes.post('/find-beneficiary', async (req, res) => {
    try{
        const {cnic} = req.body;
        if (!cnic) {
            return res.status(400).send({ message: "Please enter a valid cnic" })
        }
        const beneficiary = await Beneficiary.findOne({ cnic });
        if (!beneficiary) {
            return res.status(400).send({ message: "Beneficiary not found" })
        }
        if(beneficiary){
            res.status(200).send({ message: "Beneficiary found successfully", beneficiary:beneficiary})
        }
    }catch(error){
        res.status(400).send({ message: error.message})
    }
})

beneficiaryRoutes.post('/add-beneficiary', async(req,res)=>{
    try{
        const data = req.body;
        const beneficiary = await Beneficiary.create(data);
        res.status(200).send({message:'Beneficiary created successfully', data:beneficiary})
    }catch(error){
        res.status(400).send({message:`Beneficiary creating error at backend: ${error.message}`})
    }
})

beneficiaryRoutes.delete('/delete-beneficiary/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const beneficiary = await Beneficiary.findByIdAndDelete(id);
        res.status(200).send({message:'Beneficiary deleted successfully', data:beneficiary})
    }catch(error){
        res.status(400).send({message:`Beneficiary deleting error at backend: ${error.message}`})
    }
})

beneficiaryRoutes.put('/update-beneficiary/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const data = req.body;
        const beneficiary = await Beneficiary.findByIdAndUpdate(id,data);
        res.status(200).send({message:'Beneficiary updated successfully', data:beneficiary})
    }catch(error){
        res.status(400).send({message:`Beneficiary updating error at backend: ${error.message}`})
    }
})

// beneficiaryRoutes.put('/update-many', async(req,res)=>{
//     try{
//         const {user_id, data} = req.body;
//         const beneficiary = await Beneficiary.updateMany( {user_id:user_id}, { $set: data });
//         res.status(200).send({message:'Many Blogs updated successfully', data:blog})
//     }catch(error){
//         res.status(400).send({message:`Many Blogs updating error at backend: ${error.message}`})
//     }
// })
