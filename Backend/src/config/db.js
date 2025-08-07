import mongoose from "mongoose";
const dbConnect = async () => {
    try{
        console.log("MongoDb connection started !!");
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDb connected !! DB Host : ${connectionInstance.connection.host}`);
        
    }
    catch(err){
        console.log("MongoDb connection error !! ",err);
        process.exit(1);
    }
}

export default dbConnect;