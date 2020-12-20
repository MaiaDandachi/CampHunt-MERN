import express from 'express';
import {
  authUser,
  registerUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(getUsers);
router.route('/login').post(authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/:id').delete(protect, deleteUser);
export default router;
