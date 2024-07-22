import dbClient from './utils/db';

const waitConnection = () => {
  return new Promise((resolve, reject) => {
    let i = 0;
    const repeatFct = () => {
      setTimeout(async () => {
        try {
          i += 1;
          if (i >= 10) {
            reject(new Error('Failed to connect to DBClient after 10 attempts'));
          } else if (!dbClient.isAlive()) {
            repeatFct();
          } else {
            resolve();
          }
        } catch (err) {
          reject(err);
        }
      }, 1000);
    };
    repeatFct();
  });
};

(async () => {
  try {
    console.log(dbClient.isAlive());
    await waitConnection();
    console.log(dbClient.isAlive());
    console.log(await dbClient.nbUsers());
    console.log(await dbClient.nbFiles());
  } catch (err) {
    console.error('Error:', err);
  }
})();
