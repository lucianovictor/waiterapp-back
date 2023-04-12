import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategories } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/orders/listOrders';
import { createOrder } from './app/orders/createOrder';
import { changeOrderStatus } from './app/orders/changeOrderStatus';
import { cancelOrder } from './app/orders/cancelOrder';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// list categories
router.get('/categories',listCategories);

// Create category
router.post('/categories', createCategories);

// List Product
router.get('/products', listProducts);

// Create product
router.post('/products', upload.single('image'), createProduct);

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List orders
router.get('/orders',listOrders);

// Create order
router.post('/orders', createOrder);

// Change order status
router.patch('/orders/:orderId', changeOrderStatus);

//Delete/Cancel order
router.delete('/orders/:orderId', cancelOrder);
