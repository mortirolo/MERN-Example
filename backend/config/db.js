const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // connect using string in env var
    const conn = await mongoose.connect(process.env.MONGO_URI)
    // Test; print connection response in specified color from colors package
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB