import express from 'express';
import {
  getCamps,
  getCampById,
  createCamp,
  createCampReview,
  deleteCamp,
  updateCamp,
} from '../controllers/campController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getCamps).post(protect, createCamp);
router
  .route('/:id')
  .get(getCampById)
  .delete(protect, deleteCamp)
  .put(protect, updateCamp);
router.route('/:id/reviews').post(createCampReview);

export default router;
