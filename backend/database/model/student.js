const db = require('../db');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const studentSchema = db.Schema({
    e_roll: {
        type: String
    },
    ins_nm: {
        type: String
    },
    ins_type: {
        type: String
    },
    s_name: {
        type: String
    },
    email: {
        type: String
    },
    pass: {
        type: String
    },
    m_no: {
        type: String
    },
    teacherId: {
        type: String
    }
}, { usePushEach: true })

const student = module.exports = db.model('student', studentSchema)


module.exports.enroll = async (enrolls) => {
    try {
        const already = await student.findOne({ e_roll: enrolls.e_roll });
        console.log(already);
        if (already) {
            return false
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(enrolls.pass, salt);
            enrolls.pass = hash;
            await enrolls.save()
            return true;
        }
    } catch (e) {
        return e;
    }
}


module.exports.postStudent = async (students) => {
    const ids = {
        e_roll: students.e_roll
    }
    const data = {
        $set: {
            ins_nm: students.ins_nm,
            ins_type: students.ins_type,
            s_name: students.s_name,
            email: students.email,
            m_no: students.m_no
        }
    }
    return await student.updateOne(ids, data);
}



module.exports.studentAuth = async (info) => {
    try {
        const stud = await student.findOne({ e_roll: info.e_roll });
        if (!stud) {
            return false;
        }
        else {
            const verify = await bcrypt.compare(info.pass, stud.pass);
            if (verify) {
                return stud;
            }
            else {
                return false
            }
        }
    } catch (e) {
        return e;
    }
}
