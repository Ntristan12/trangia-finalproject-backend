import config from '../config.json';
import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model';
import refreshTokenModel from '../accounts/refresh-token.model';

const db: any = {};
export default db;

initialize();

async function initialize() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });

  db.Account = accountModel(sequelize);
  db.RefreshToken = refreshTokenModel(sequelize);

  db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
  db.RefreshToken.belongsTo(db.Account);

  await sequelize.sync();
}