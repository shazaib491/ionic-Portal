const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/portal',{
	    useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex:true
}).then(()=>{
	console.log('connected  to databse')
}).catch(err=>console.log(err))
let secret = "shazaib";
module.exports = mongoose;
module.exports.secret = secret;
