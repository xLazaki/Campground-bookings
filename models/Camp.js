const mongoose = require('mongoose');
const CampSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true,'Please add a name'],
        unique: true,
        trim: true,
        maxlength:[50,'Name can not be more than 50 characters']
    },
    address:{
        type:String,
        required:[true,'Please add an address']
    },
    tel:{
        type:String,
        required:[true,'Please add telephone number']
    }
},{
    toJSON: {virtuals:true},
    toObject:{virtuals:true}
});

//Reverse populate with virtuals
CampSchema.virtual ('camps', {
    ref: 'Resevation',
    localField:'_id',
    foreignField:'camp',
    justOne:false
});
module.exports=mongoose.model('Camp',CampSchema);