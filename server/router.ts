import Router from 'express';

const router = Router();

import  {getAllCampgrounds, postCampground, removeCampground, getCampgroundById } from './controllers/campgrounds.controller';

router.get('/campgrounds', getAllCampgrounds);
router.post('/campgrounds', postCampground);
router.delete('/campgrounds/:_id', removeCampground);
router.get('/campgrounds/:_id', getCampgroundById);

export default router;


