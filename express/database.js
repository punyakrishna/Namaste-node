const { MongoClient } = require("mongodb");
const url =
  //   "mongodb+srv://punyakrishna2000:oMRVaQgelnYkrmEs@punya-node.rhoit.mongodb.net/?retryWrites=true&w=majority&appName=Punya-node";
  "mongodb+srv://punyakrishna2000:oMRVaQgelnYkrmEs@punya-node.rhoit.mongodb.net/";
//   "mongodb+srv://punyakrishna2000:oMRVaQgelnYkrmEs@punya-node.rhoit.mongodb.net/?retryWrites=true&w=majority&appName=Punya-node";
const client = new MongoClient(url);

const dbName = "HelloWorld";

async function main() {
  await client.connect();
  console.log("Connected succesfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  //Read data from the 

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
