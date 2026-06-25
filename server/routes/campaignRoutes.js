import express from 'express';
import { getAllCampaigns, getCampaignById, seedCampaigns } from '../controllers/campaignController.js';

const router = express.Router();

router.get('/', getAllCampaigns);
router.get('/seed', seedCampaigns);
router.get('/:id', getCampaignById);

export default router;
