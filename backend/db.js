// mongodb+srv://letsEat:monika@123@cluster0.nwsldst.mongodb.net/?retryWrites=true&w=majority

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const uri = "mongodb://127.0.0.1:27017/monika";

const mongoDB = async()=> {
    await mongoose.connect(uri,{useNewUrlParser: true}, async(err, result)=> {
        if(err) console.log("---",err);

        else {
            console.log("connected"); 
            const fetchedData = await mongoose.connection.db.collection("name");
            fetchedData.find({}).toArray(function( err, data ) {
                if(err) console.log(err);
                else global.foodItems = data;
            })

            const categoryData = await mongoose.connection.db.collection("foodCategory");
            categoryData.find({}).toArray(function( err, data ) {
                if(err) console.log(err);
                else global.foodCat = data;
            })
        }
    })
}

module.exports = mongoDB;

