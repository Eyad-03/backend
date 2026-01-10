import express from 'express'
import {createCategory,getCategory,updateCategory,deleteCategory} from '../controllers/categories.Controller.js'

const router=express.Router();

router.post('/createCategory',createCategory)
router.get('/getCategory',getCategory)
router.delete('/deleteCategory/:id',deleteCategory)
router.put('/updateCategory/:id',updateCategory)

export default router

