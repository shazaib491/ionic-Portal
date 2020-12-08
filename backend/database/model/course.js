const db=require('../db');
const CourseScehma=db.Schema({
    c_nm:{
        type:String
    },
    duration:{
        type:Number
    },
    sem:{
        type:Number
    },
    year:{
        type:Number
    },
    branch:{
        type:Array
    }
})

const courses=module.exports=db.model('course',CourseScehma);

module.exports.insertCourse=async(course)=>{
    return await course.save()
}
