import Router from 'express';
const router = new Router();
const controller = require('./controllers/campgrounds.controller');

router.get('/campgrounds', (controller.getAllCampgrounds));
router.post('/campgrounds', (controller.postCampground));
router.delete('/campgrounds/:_id', (controller.removeCampground));
router.get('/campgrounds/:_id', (controller.getCampgroundById));

module.exports = router;
