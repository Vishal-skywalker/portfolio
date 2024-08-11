import express from 'express'
import { methodNotAllowed, STATUS_CODES } from '../Utility.js';

const router = express.Router();

/**
   * @swagger
   * /profile:
   *   get:
   *     description: Returns the profile info
   *     responses:
   *       200:
   *         description: A succes response
   */
router.route('/profile')
    .get(async (req, res) => {
        try {
            return res.status(STATUS_CODES.SUCCESS).json({ message: 'Get is working' });
        } catch (error) {
            res.status(STATUS_CODES.UNAUTHERIZED).json(error);
        }
    })
    .all((req, res) => {
        methodNotAllowed(res, req.method);
    });

export default router;