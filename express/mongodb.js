const { MongoClient, ObjectId } = require("mongodb");
const url =
  "mongodb+srv://punyakrishna2000:oMRVaQgelnYkrmEs@punya-node.rhoit.mongodb.net/?retryWrites=true&w=majority&appName=Punya-node";
//   "mongodb+srv://punyakrishna2000:oMRVaQgelnYkrmEs@punya-node.rhoit.mongodb.net/";
const client = new MongoClient(url);

const dbName = "HelloWorld";

async function main() {
  await client.connect();
  console.log("Connected succesfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  //Read data from the the db
  const data = await collection.find().toArray();

  const reqBody = {
    Firstname: "Punya2",
    Lastname: "B K",
    City: "Bengaluru",
    Phonenumber: 8431318477,
  };

  // //Insert data
  // const inserStatus = await collection.insertOne(reqBody);
  // console.log(inserStatus);
  // //Delete multiple records

  // //Update propert
  // const updateStatus = await collection.updateOne(
  //   { _id: new ObjectId("671cef42b55a91df5e2d6548") },
  //   { $set: { Firstname: "Janu" } }
  // );
  // console.log(updateStatus);

  // //Delete a specific property
  // const deleteSpecificProperty = await collection.updateOne(
  //   { _id: new ObjectId("67177fa3585a09322e0cb621") },
  //   { $unset: { name: "" } }
  // );
  // console.log(deleteSpecificProperty);

  // //Delete record
  // const deleteStatus = await collection.deleteMany({
  //   _id: new ObjectId("67177fa3585a09322e0cb621"),
  // });
  // console.log(deleteStatus);

  // //Delete multiple records
  // const deleteStatus = await collection.deleteMany({
  //   _id: {
  //     $in: [
  //       new ObjectId("67177fa3585a09322e0cb621"),
  //       new ObjectId("12345fa3585a09322e0cb789"),
  //       // add more ObjectIds as needed
  //     ],
  //   },
  // });
  // console.log(deleteStatus);

  return data;
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
