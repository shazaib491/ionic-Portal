const db=require('../db');

const subjectScehma=db.Schema({
    c_nm:{
        type:String
    },
    c_branch:{
        type:String
    },
    sub_nm:{
        type:Array
    }
})
const subject=module.exports=db.model('subject',subjectScehma);

module.exports.insertSubject=async(subject)=>{
    return await subject.save()
}