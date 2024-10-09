import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false, // Optional: disable logging for a cleaner console output
});

const Comic = sequelize.define('Comic', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  issueNumber: { type: DataTypes.INTEGER, allowNull: false },
  publisher: { type: DataTypes.STRING },
  condition: { type: DataTypes.STRING },
  cgcGrade: { type: DataTypes.FLOAT },
  purchasePrice: { type: DataTypes.FLOAT },
  notes: { type: DataTypes.TEXT },
});

sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

export { sequelize, Comic };