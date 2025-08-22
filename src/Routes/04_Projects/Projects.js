import express from 'express'
import { methodNotAllowed, STATUS_CODES, sendErrorResponse } from '../../Utility.js';
import axios from 'axios';

const router = express.Router();
router.route('/projects')
    .get(async (req, res) => {
        try {
            let data = await global.conn.apex.get('/v1/projects');
            return res.status(STATUS_CODES.SUCCESS).json(data);
        } catch (error) {
            sendErrorResponse(error, res, STATUS_CODES.UNEXPECTED);
        }
    })
    .all((req, res) => {
        methodNotAllowed(res, req.method);
    });
router.route('/projects/:uuid')
    .get(async (req, res) => {
        try {
            if (!req.params.uuid?.trim()) {
                return sendErrorResponse('UUID is required!', res, STATUS_CODES.BAD_REQUEST);
            }
            axios
                .get(global.conn.instanceUrl + '/services/apexrest/v1/projects/' + req.params.uuid,
                    { headers: { Authorization: `Bearer ${global.conn.accessToken}` } }
                )
                .then(result => {
                    return res.status(STATUS_CODES.SUCCESS).json(result.data);
                })
                .catch(error => {
                    if (error.response) {
                        sendErrorResponse(error.response.data, res, error.response.status);
                    } else {
                        throw error;
                    }
                })
        } catch (error) {
            sendErrorResponse(error, res, STATUS_CODES.UNEXPECTED);
        }
    })
    .all((req, res) => {
        methodNotAllowed(res, req.method);
    });

export default router;