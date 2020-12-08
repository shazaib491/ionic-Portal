const db = require('../db');
const bcrypt = require('bcrypt');
const teacherSchema = db.Schema({
  uname: {
    type: String,
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  m_no: {
    type: Number
  }
})
// export table name
const teacher = module.exports = db.model('teacher', teacherSchema)

// insert data
module.exports.teacherInfo = async (detail) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(detail.password, salt);
    detail.password = hash;
    return await detail.save();
  } catch (e) {
    return e;
  }
}
module.exports.teachAuth = async (info) => {
  try {
    const user = await teacher.findOne({
      email: info.email
    });
    if (!user) {
      return false;
    } else {
      const verify = await bcrypt.compare(info.password, user.password);
      if (verify) {
        return user;
      } else {
        return false
      }
    }
  } catch (e) {
    return e;
  }
}
