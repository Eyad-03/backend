import express from 'express';
import {createProduct,getAllProducts,getProductById,deleteProductById,updateProductById} from '../controllers/products.Controller.js';

const router=express.Router();

router.post('/createProduct',createProduct)
router.get('/getAllProducts',getAllProducts)
router.get('/getProductById',getProductById)
router.delete('/deleteProductById/:id',deleteProductById)
router.put('/updateProductById/:id',updateProductById)

export default router