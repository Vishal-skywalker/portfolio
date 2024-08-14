import express from 'express'
import { methodNotAllowed, STATUS_CODES, sendErrorResponse } from '../../Utility.js';

const query = `SELECT Id,
    Account.Name,
    Account.Website,
    Languages_t__c,
    Website_url__c,
    MailingAddress,
    Description,
    Name,
    Phone,
    Birthdate,
    Age_f__c,
    Email
    FROM Contact
    WHERE LastName = 'Das' AND FirstName = 'Vishal'`;

const router = express.Router();
router.route('/profile')
    .get(async (req, res) => {
        try {
            let data = await global.conn.query(query);
            data = data.records[0];
            const responseData = {
                name: data.Name,
                about: data.Description,
                birth_date: data.Birthdate,
                age: data.Age_f__c,
                contact_info: {
                    mobile_phone: data.Phone,
                    email: data.Email,
                    website: data.Website_url__c,
                    address: {
                        street: data.MailingAddress.street,
                        city: data.MailingAddress.city,
                        postal_code: data.MailingAddress.postalCode,
                        state: data.MailingAddress.state,
                        country: data.MailingAddress.country,
                    }
                },
                current_employer: {
                    name: data.Account.Name,
                    website: data.Account.Website,
                }
            };
            return res.status(STATUS_CODES.SUCCESS).json(responseData);
        } catch (error) {
            sendErrorResponse(error, res, STATUS_CODES.UNEXPECTED);
        }
    })
    .all((req, res) => {
        methodNotAllowed(res, req.method);
    });

export default router;