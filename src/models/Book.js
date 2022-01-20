const mongodb = require('@condor-labs/mongodb')();

const BookSchema = mongodb.mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongodb.mongoose.model('Book', BookSchema);
