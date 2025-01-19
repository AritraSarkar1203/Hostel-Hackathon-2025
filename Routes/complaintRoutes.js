import express from 'express';
import { getComplaints, getActiveComplaints, createComplaint, deleteComplaint, editComplaint } from '../Controllers/complaintsController.js';

const router = express.Router();

router.get('/all/:id', getComplaints); 
router.get('/active/:id', getActiveComplaints);
router.post('/create', createComplaint);  
router.delete('/delete/:id', deleteComplaint);
router.patch('/edit/:id', editComplaint);

export default router;