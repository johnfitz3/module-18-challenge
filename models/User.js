const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: { 
            type: String,
            unique: true,
            trim: true,
            required: 'Username is Required'
    },
    email: { 
        type: String,
        unique: true,
        trim: true,
        required: 'Email is Required',
        match: [/.+@.+\..+/],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

UserSchema.virtual("friendCount").get(function (){
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
