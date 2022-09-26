const Router = require('express');
const router = new Router();
const controller = require('./controllers/campgrounds.controller');

router.get('/', (controller.getAllCampgrounds));
router.post('/', (controller.postCampground));
router.delete('/:_id', (controller.removeCampground));
router.get('/:_id', (controller.getCampgroundById));

module.exports = router;
