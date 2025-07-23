import { Router} from 'express';
import { listProducts, getProductById, createProduct, updateProduct, deleteProduct } from './products.controller.js';
import { validateData } from '../../middlewares/validationMiddleware';
// import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { createProductSchema, updateProductSchema } from '../../db/schema';

// const createProductSchema = z.object({
//     name: z.string(),
//     price: z.number({ message: 'Price must be a number' }),
// })




const router = Router()
router.get('/', listProducts)

router.get('/:id', getProductById)

router.post('/', validateData(createProductSchema), createProduct)

router.put('/:id', validateData(updateProductSchema), updateProduct)

router.delete('/:id', deleteProduct)

export default router