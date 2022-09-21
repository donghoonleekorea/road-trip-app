const Router = require('express');
const router = new Router();
const controller = require('./controllers/campgrounds.controller');
const Campground = require('./models/campgrounds.model');


router.get('/', (controller.getAllCampgrounds));
router.post('/', (controller.postCampground));
router.delete('/:_id', (controller.removeCampground));
router.get('/:_id', (controller.getOneCampground));

module.exports = router;
