require('dotenv').config();
const carData = require('./carSeeder');
const connect2Db = require('../config/dbConfig');
const CarProduct = require('../model/carModel')

// initialize the db connection
const importData = async () => {
    await connect2Db();
    try {
        await CarProduct.deleteMany({})
        await CarProduct.insertMany(carData)

        console.info('Product added to Database successfully')
        process.exit()
    } catch (error) {
        console.error('Error in Data import')
        process.exit(1)
    }
}

importData();