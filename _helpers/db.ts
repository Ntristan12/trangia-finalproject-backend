import config from '../app-config';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model';
import refreshTokenModel from '../accounts/refresh-token.model';

const db: any = {};
export default db;

initialize();

async function initialize() {
  const { host, port, user, password, database } = config.database;

  try {
    console.log(`Connecting to MySQL database "${database}" on host "${host}"...`);
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end(); // close temporary connection

    const sequelize = new Sequelize(database, user, password, {
      dialect: 'mysql',
      host,
      port,
      logging: false // set to false for cleaner console output, or true if you want to see queries
    });

    db.Account = accountModel(sequelize);
    db.RefreshToken = refreshTokenModel(sequelize);

    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    await sequelize.sync();
    console.log(`✅ Successfully connected and synced database "${database}" on "${host}"!`);
  } catch (error: any) {
    console.error(`❌ Database connection failed for database "${database}" on host "${host}".`);
    console.error(`Error details: ${error.message}`);
    console.error(`Please ensure your MySQL server is running and credentials in config.json (or environment variables) are correct.`);
    throw error;
  }
}