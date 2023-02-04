const express = require('express');
const router = express.Router();
const Cart = require('../models/CartData');

router.post('/cartData', async(req, res) => {
    let data = req.body.data
    await data.splice(0, 0, {date: req.body.date})


    let emailId = await Cart.findOne({'email': req.body.email})

    if(emailId === null) {
        try {
            await Cart.create({
                email: req.body.email,
                data: [data],
            }).then(()=> {
                res.json({success: true})
            })
        }

        catch(err) {
            res.send(err);
        }
    }

    else {
        try {
            await Cart.findOneAndUpdate({'email': req.body.email},
                {$push: {data: data}}).then(()=> {
                    res.json({success: true})
                })
        }

        catch(err) {
            res.json({success: false})
        }
    }

})

router.post('/myOrder', async(req, res)=> {
    try{
        let MyData = await Cart.findOne({'email': req.body.email});
        res.json({data: MyData.data})
        console.log(MyData)
    }
    catch(err) {
        res.send(err)
    }
})

module.exports = router
