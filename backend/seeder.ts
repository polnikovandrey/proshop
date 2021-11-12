import { ObjectId } from "mongoose";
import dotenv from "dotenv";
import { users } from "./data/users.js";
import { products } from "./data/products.js";
import { User, UserModel } from "./models/userModel.js";
import { ProductModel } from "./models/productModel.js";
import { OrderModel } from "./models/orderModel.js";
import connectDb from "./config/db.js";

dotenv.config();

connectDb().then();

const importData = async () => {
    try {
        await OrderModel.deleteMany();
        await ProductModel.deleteMany();
        await UserModel.deleteMany();

        const createdUsers: User[] = await UserModel.insertMany(users);
        const adminUserId: ObjectId = createdUsers[0]._id;

        products.forEach(product => product.user = adminUserId);

        await ProductModel.insertMany(products);

        console.log('Data imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await OrderModel.deleteMany();
        await ProductModel.deleteMany();
        await UserModel.deleteMany();

        console.log('Data destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const consoleCommandArgument: string = process.argv[2];
if (consoleCommandArgument === '-d') {
    destroyData().then();
} else {
    importData().then();
}