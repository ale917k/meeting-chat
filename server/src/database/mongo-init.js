// Create admin user for reading and writing data from server
db.createUser({
  user: "admin",
  pwd: "password",
  roles: [
    {
      role: "root",
      db: "admin",
    },
  ],
});

// Create testing data for local environment
// User - email: test@gmail.com, username: test, psw: qweqweqwe
let res = [
  db.users.drop(),
  db.users.insertMany([
    {
      name: "admin",
      salt: "c459dc3f5c51af450064ce393f2f71206c96d11ebdd98f54993d4c14428d2196",
      hash:
        "251f543f878bfe25e963be061fa96bcb45abb2e2a9220f19c7e9bb29cd3497ba0469229b1f17a79e6a1501732055e485f8b6daf773451e7ae97ab145387a6cc9ef1d61286f3a1bbe16fbe4fd4b12442365ac6f15124aea0c5996cc157d1583c66719818b164f6a228ebead95490b452b1fd49bda5563ea16df80edcc887ce16d9490897d228069441d0c704a8a38015b96639c7186e97d0b27b74d4736db726fc8e5b9844ed58318a21be695592f068fb46d1faf119114e9519382c457d95084aeb0f83211c0e10289fd828884832b64c9f35f8f9cf5e0ce9970ddb8492b7629f6ab07189218af4b9396c4c2a706ebf15768112ffa08ee1f15b42fd83c28d0023343fccd984c40623ea16d492e1d632c4bcd9a496ecefd422a4b7614dc2abc69f8b173b3ca0ca5123c42db82fd63a6427aae46ed3bb8b214532fb2015de6086d670f9edfcfd9d8074dfafb0326dbde3e0229bbbd11bd0f4e490df6bf25120c5ab0b00973486d379eabccd9c16604e1489378c911d7d55f886f59991002176cbf4f0b2305ce3158242b6d90696fc8db059c41140f540a0eaac6eb2b7d17f1910d1a567623ae695c0cacc83b30df6c49a2985e6483a16e366ac326777cbb6996a1facde0b89a3979d06c37714fbbdd29c87500b0a289eee8c1d76205c2046f0cbbd681abd3457730fd9997caa12fe536587463f0a3b88cccd6a13afe0a5d8550bb",
      createdAt: ISODate("2020-01-01T00:00:00.174Z"),
      updatedAt: ISODate("2020-01-01T00:00:00.174Z"),
    },
  ]),
];
printjson(res);
