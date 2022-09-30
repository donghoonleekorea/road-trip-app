import Router from 'express';
//const Router = require('express');
import  controller from './controllers/campgrounds.controller';
//const controller = require('./controllers/campgrounds.controller')

const router = Router();


router.get('/campgrounds', controller.getAllCampgrounds);
router.post('/campgrounds', controller.postCampground);
router.delete('/campgrounds/:_id', controller.removeCampground);
router.get('/campgrounds/:_id', controller.getCampgroundById);

export default router;


