import express from 'express'

import { Askquestion } from '../Controllers/Askquestion.js'
import { FetchAllQuestion } from '../Controllers/Askquestion.js'
import { deleteQuestion } from '../Controllers/Askquestion.js';
import { VoteQuestion } from '../Controllers/Askquestion.js';



const router = express.Router();

router.post('/Ask' , Askquestion)
router.get('/get' , FetchAllQuestion)
router.delete('/delete/:id', deleteQuestion );
router.patch('/vote/:id',  VoteQuestion)

export default router;