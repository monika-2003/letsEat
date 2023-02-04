const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res)=> {
    try{
        res.json([global.foodItems, global.foodCat]);
    }
    catch(err) {
        res.send({message: "error occured"})
    }
})

module.exports = router
