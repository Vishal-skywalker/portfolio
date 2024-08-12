import express from 'express'
import { methodNotAllowed, STATUS_CODES, sendErrorResponse } from '../../Utility.js';

const router = express.Router();
router.route('/profile')
    .get(async (req, res) => {
        try {
            const data = await global.conn.query('SELECT Id, Name FROM Account');
            return res.status(STATUS_CODES.SUCCESS).json(data);
        } catch (error) {
            sendErrorResponse(error, res, STATUS_CODES.UNEXPECTED);
        }
    })
    .all((req, res) => {
        methodNotAllowed(res, req.method);
    });

export default router;