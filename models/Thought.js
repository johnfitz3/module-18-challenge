const { Schema, model, Types } = require("mongoose");

const reactionSchema= new Schema(
    {
        rectionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
    },
     
    usernames: {
        type: String,
        required: true,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
},
{
    toJSON: {
        getters: true,
    },
    id: false,
}
);

const ThoughtSchema = new schema(
    {
        thoughtText: {
            type: String,
            required: "Thought is required",
            minlength: 1,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp)
    },

    username: {
        type: String,
        required: true,
    },

    reactions: [ReactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
},
id: false,
}
);

thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.lengthl;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;