/** Third party dependencies */
const mongoose = require("mongoose");



/** Application configuration and declarations */
const schema = mongoose.Schema;



const connections = {
    connection_CORESECONDARYPREFERRED,
    connection_COREPRIMARYPREFERREDWMAJORITY,
    connection_COREPRIMARYPREFERREDW1,
    connection_COREPRIMARYPREFERREDW0,
} = require('../config/database');

let {
    IS_BUILD_MONGO_INDEXES_ENABLED,
} = process.env;

/** Application decalrations and configurations */
IS_BUILD_MONGO_INDEXES_ENABLED = JSON.parse(IS_BUILD_MONGO_INDEXES_ENABLED);

const friendsSchema = new schema({
    friend_id:
    {
        type: mongoose.Types.ObjectId,
        ref: "Friend",
        index: true
    },
    user_id:
    {
        type: mongoose.Types.ObjectId,
        ref: "User",
        index: true
    },
    status: //1 for friend, 2 for sent by, 3 for received by
    {
        type: mongoose.Schema.Types.Number,
        index: true
    }
});

const userSchema = new schema({
    first_name: {
        type: "string",
        index: true
    },
    last_name: {
        type: "string",
        index: true
    },
    fullname: {
        type: "string",
        index: true
    },
    date_of_birth: {
        type: "date",
        default: null
    },
    gender: {
        type: "number",
        default: null
    },
    username: {
        type: "string",
        unique: true,
        index: true
    },
    profile_picture: {
        type: "string",
        default: null
    },
    email: {
        type: "string",
        unique: true,
        index: true
    },
    password: {
        type: "string",
        default: null
    },
    active: {
        type: "number",
        default: 1
    },
    password_reset_token: {
        type: "string",
        default: null
    },
    email_verification_token: {
        type: "string",
        default: null
    },
    last_seen: {
        type: "date",
        default: null
    },
    online_status: {
        type: "number",
        default: 0
    },
    profile_accessibility: {
        type: "string",
        default: "public"
    },
    is_email_verified: {
        type: "number",
        default: 0
    },
    jersey_number: {
        type: "number",
        default: null
    },
    biography: {
        type: "string",
        default: null
    },
    refresh_token: {
        type: "string",
        default: null
    },
    isPromotionEmail: {
        type: Boolean,
        default: false,
    },
    is_demo: {
        type: Boolean,
        default: false,
    },
    device_token: {
        type: 'string',
        default: null,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    email_verification_token_created_at: {
        type: Date,
        default: null,
    },
    password_reset_token_created_at: {
        type: Date,
        default: null,
    },
    meta: {
        type: Object,
        default: null
    },
    friends: [friendsSchema]
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })

userSchema.set("toJSON", { virtuals: true })
userSchema.set("toObject", { virtuals: true })

if (IS_BUILD_MONGO_INDEXES_ENABLED) {

    userSchema.index(
        {
            refresh_token: 1,
        },
        { partialFilterExpression: { deleted: false } }
    );

    userSchema.index(
        {
            device_token: 1,
        },
        { partialFilterExpression: { deleted: false } }
    );

    userSchema.index(
        {
            email_verification_token: 1,
        },
        { partialFilterExpression: { deleted: false } }
    );

    userSchema.index(
        {
            password_reset_token: 1,
        },
        { partialFilterExpression: { deleted: false, is_email_verified: 1 } }
    );

    userSchema.index(
        {
            email: 1,
        },
        { partialFilterExpression: { deleted: false } }
    );

    userSchema.index(
        {
            is_demo: 1,
        },
        { partialFilterExpression: { deleted: false } }
    );
}

const userModel = {
    UserRead: connection_CORESECONDARYPREFERRED.model("User", userSchema, "users"),
    UserWrite: connection_COREPRIMARYPREFERREDW1.model("User", userSchema, "users"),
    // UserWriteM: connection_COREPRIMARYPREFERREDWMAJORITY.model("User", userSchema, "users"),
    // UserWrite0: connection_COREPRIMARYPREFERREDW0.model("User", userSchema, "users"),
};

userModel.UserWrite
    .ensureIndexes((err) => {
        if (err) console.log("model error: ", err);
    }
    );

module.exports = userModel;