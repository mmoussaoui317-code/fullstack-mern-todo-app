const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        // String(process.env.MONGODB_URI) || process.env.MONGODB_URI ||
        const conn = await mongoose.connect('mongodb://localhost:27017/todoapp' , {
            useNewUrlParser: true,
            useUnifiedTopology: true
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