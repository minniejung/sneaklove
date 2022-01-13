require('../../config/mongodb');

const UserModel = require('../../models/User')

const users = [
    {
    name: "Minyoung",
    lastname: "JUNG",
    email: "minyoung@jung.com",
    password: "1234",
},
{
    name: "Henri",
    lastname: "RIGOU",
    email: "ppfpf@gror.com",
    password: "arigato",
},
{
    name: "Mélodie",
    lastname: "IDK",
    email: "Memelmelemle@mel.mel",
    password: "1234",
}
];

(async function(){
    try{
        await UserModel.deleteMany();
        await UserModel.insertMany(users);
        console.log("Users created")
        process.exit()
    }catch(err){
        console.error(err)
    }
})