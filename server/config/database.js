const mongoose = require('mongoose');

const connectDatabase = () => {
    // Get database URI from environment variables with fallback
    const DB_URI = process.env.DB_URI ||
        process.env.MONGODB_URI ||
        'mongodb://192.168.1.89:27017/munity-staking';

    console.log('Attempting to connect to database...');

    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // Additional options for better connection handling
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        bufferCommands: false, // Disable mongoose buffering
        //bufferMaxEntries: 0 // Disable mongoose buffering
    })
        .then((connection) => {
            console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
            console.log(`📊 Database Name: ${connection.connection.name}`);
        })
        .catch((error) => {
            console.error('❌ Database Connection Error:', error.message);

            // Log specific error types for debugging
            if (error.name === 'MongoNetworkError') {
                console.error('🌐 Network Error: Check if MongoDB is running');
            } else if (error.name === 'MongoParseError') {
                console.error('🔗 Connection String Error: Check DB_URI format');
            } else if (error.name === 'MongoServerSelectionError') {
                console.error('🖥️  Server Selection Error: MongoDB server not reachable');
            }

            // Exit process with failure
            process.exit(1);
        });

    // Handle connection events
    mongoose.connection.on('connected', () => {
        console.log('🔗 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
        console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('🔌 Mongoose disconnected from MongoDB');
    });

    // Handle application termination
    process.on('SIGINT', async () => {
        try {
            await mongoose.connection.close();
            console.log('🛑 Database connection closed through app termination');
            process.exit(0);
        } catch (error) {
            console.error('Error closing database connection:', error);
            process.exit(1);
        }
    });
};

module.exports = connectDatabase;