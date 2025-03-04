import mongoose from 'mongoose';

let isConnected = false;

export const connectDatabase = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is connected');

        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;

        console.log('MongoDB is connected');
    } catch (e) {
        console.error(e);
    }

}

export default connectDatabase;