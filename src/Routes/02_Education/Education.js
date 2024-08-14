import express from 'express'
import { methodNotAllowed, STATUS_CODES, sendErrorResponse } from '../../Utility.js';

const router = express.Router();
router.route('/education')
    .get(async (req, res) => {
        try {
            let data = await global.conn.apex.get('/v1/schools');
            return res.status(STATUS_CODES.SUCCESS).json(data);
        } catch (error) {
            sendErrorResponse(error, res, STATUS_CODES.UNEXPECTED);
        }
    })
    .all((req, res) => {
        methodNotAllowed(res, req.method);
    });

export default router;