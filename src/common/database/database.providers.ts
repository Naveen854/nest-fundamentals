// import { DataSource } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const isNotProd =  process.env.NODE_ENV !== 'production'
//       const dataSource = new DataSource({
//         type: 'postgres',
//         host: 'localhost',
//         port: 5432,
//         username: 'postgres',
//         password: 'pass123',
//         database: 'postgres',  // Make sure you get the DB name
//         synchronize: isNotProd, // Disable synchronization in production
//         logging: isNotProd, // Enable logging in dev for debugging
//         entities: [
//           __dirname + '/../**/*.entity{.ts,.js}',
//         ],  // Add all your entities here
//         migrations: [],  // Optionally specify your migrations
//       });

//       try {
//         // Initialize the connection
//         await dataSource.initialize();
//         console.log('Data Source has been initialized!');
//       } catch (error) {
//         console.error('Error during Data Source initialization:', error);
//         throw error; // Throw error to make sure NestJS doesn't proceed if the DB is not connected
//       }
//       return dataSource;
//     },
//   },
// ];
