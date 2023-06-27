/* eslint no-undef: 0 */

print("============================================================================");
print("==================== RUNNING MONGO INIT-MONGO.JS SCRIPT ====================");
print("============================================================================");

db.getSiblingDB("energy").createUser({
  user: "energy",
  pwd: "rhinos",
  roles: [
    {
      role: "dbOwner",
      db: "energy"
    }
  ]
});
