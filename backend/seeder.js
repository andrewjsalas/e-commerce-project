import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Delete models data before importing new data 
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Put created users to a variable
        const createdUsers = await User.insertMany(users);
        
        // Get Admin user
        const adminUser = createdUsers[0]._id;

        // Create variable with product data and adminUser
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // Insert product data into the database
        await Product.insertMany(sampleProducts);

        // '.gree.inverse' colors the log statement green via 'colors'.
        console.log('Data imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data destroyed! '.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Conditional to run import or destroyData individually by including or disregarding '-d' in the command statement
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
};

// Must add the following scripts to package.json
/* 
    "data:import": "node backend/seeder.js",
    "data:destroy": "node backend/seeder.js -d"
*/

// From here in the command line while in the root folder, run either:
// 'npm run data:import' or 'npm run data:destroy'