const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const VerificationSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    token: {
        type: String,
        required: true
    },

    createdAt:{
        type: Date,
        expires: 3600,
        default: Date.now()
    }

})

VerificationSchema.pre("save", async function (next){
    if(this.isModified("token")){
        const hash = await bcrypt.hash(this.token, 10);
        this.token = hash;
    }
    next();
});

VerificationSchema.methods.compareToken = async function (token){
    const result = await bcrypt.compareSync(token, this.token);
    return result;
}

module.exports = mongoose.model('Verification', VerificationSchema);