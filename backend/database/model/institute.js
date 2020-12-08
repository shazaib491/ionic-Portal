const db=require('../db');
const instituteScehma=db.Schema({
  i_type:{
    type:String
  },
  i_name:{
    type:String
  },
  userId:{
    type:String
  },
  email:{
    type:String
  },
  m_no:{
    type:String
  },
  creartedAt:{
    type:String,
    default:Date
  }
})


const institute=module.exports=db.model('institute',instituteScehma);

module.exports.insertInstitute=async(data)=>{
  return await data.save();
}

module.exports.displayInstitute=async()=>{
  await institute.find({});
}

module.exports.UpdateUserId=async(id,data)=>{
  return await institute.findByIdAndUpdate({_id:id},{$set:{userId:data}})
}
