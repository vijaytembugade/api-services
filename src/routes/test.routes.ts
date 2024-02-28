
import { Router } from 'express';

const router = Router();

router.route('/').get((req, res) => {
    res.json({
        status: "OK",
        message: "API's are running"
    })
});

export default router;