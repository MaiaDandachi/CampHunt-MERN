import dotenv from 'dotenv';
import users from './data/users.js';
import camps from './data/camps.js';
import User from './models/userModel.js';
import Camp from './models/campModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Camp.deleteMany();

    const createdUsers = await User.insertMany(users);

    const sampleCamps = camps.map((camp, i) => {
      return { ...camp, user: createdUsers[i]._id };
    });

    await Camp.insertMany(sampleCamps);

    console.log('Data imported');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Camp.deleteMany();

    console.log('Data Destroyed');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
