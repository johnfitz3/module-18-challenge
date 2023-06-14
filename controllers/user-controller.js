const { User, Thought } = require("../models");
const { db } = require("../models/User");

const userController = { 
    ////////////////////////////////////////////getting all users////////////////////////////////
    getAllUser(req, res)
 {
    User.findById({})
    .populate({
        path: 'friends',
        select: '-__v',
    })
    .select('-__v')
    .sort({_id: -1})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
 },
////////////////////////////////////////////getting single user by id////////////////////////////////
 getUserById({ params}, res) {
    User.findOne({ _id: params.id})
    .populate({
        path: 'thoughts',
        select: '-__v',
    })
    .populate({
        path: 'friends',
        select: '-__v',
 })
 .select('-__v')
 .then((dbUserData) => {
    if(!dbUserData) {
        return res.status(404)
        .json({message: "No user matches id"});
    }
    res.json(dbUserData);
 })
 .catch((err) => {
    console.log(err);
    res.sendStatus(400);
});
}, 
////////////////////////////////////////////creating a user////////////////////////////////
createUser({ body }, res) {
    User.create(body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.json(err));
},
////////////////////////////////////////////updating a user////////////////////////////////
updateUser({params, body }, res) {
    User.findOneAndUpdate({_id:params.id}, body, {
        new:true,
        runValidators:true, 
    })
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({
                message:"No user matches id"
            });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => res.json(err));
},
////////////////////////////////////////////deleting a users////////////////////////////////
deleteUser({ params}, res) {
    User.findOneAndDelete({_id: params.id})
    .then((dbUserData) => {
        if(!dbUserData) {
            return res.status(404).json({
                message: "No user matches id"
            })
    }
    return Thought.deleteMany({_id: {$in: dbUserData.thoughts} });
})
.then(() => {
    res.json({message:"User and their thughts have been deleted"});
})
.catch((err) => res.json(err));
},
////////////////////////////////////////////adding a friend////////////////////////////////
addFriend({ params}, res) {
    User.findOneAndUpdate(
        {_id:params.userId},
        {$addToSet: {friends: params.friendId}},
        {new: true, runValidators: true}
    )
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({message: "No user matches id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

////////////////////////////////////////////removing a friend////////////////////////////////

    removeFriend({ params}, res) {
        User.findOneAndUpdate(
            {_id:params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
            .then((dbUserData) => {
                if(!dbUserData) {
                    return res.status(404).json({ message: "No user matches id"});
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },
};

module.exports = userController;