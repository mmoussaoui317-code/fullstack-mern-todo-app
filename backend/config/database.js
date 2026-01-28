const mongoose = require('mongoose');

/**
 * Returns the MongoDB URI based on the current environment.
 * In production, it returns the MONGODB_URI environment variable.
 * In development, it returns 'mongodb://localhost:27017/todoapp'.
 * @returns {string} The MongoDB URI.
 */
function getMongoUri() {
    return process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/todoapp';
    // return process.env.MONGODB_URI
}

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(getMongoUri(), {
            serverSelectionTimeoutMS: 5000,
        });
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`📁 Collections: ${collections.map(c => c.name).join(', ') || 'None yet'}`);
        
    } catch(error) {
        console.log('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }

}

module.exports = connectDB;