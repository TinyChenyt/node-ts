import router from "./mian";
const tagController = require('../controllers/tagsController');

router.get('/tags', tagController.getTagsList);


