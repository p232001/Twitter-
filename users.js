const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authjs');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const writerSchema = mongoose.Schema({
    name: String,
    books_writen: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    }]
});
const writerModel = mongoose.model('writer', writerSchema);
module.exports = writerModel;

const bookSchema = mongoose.Schema({
    bookname: String,
    isbn: String,
    writer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'writer'
    }
});
const bookModel = mongoose.model('book', bookSchema);

writerModel.create({
    name: 'Preeti Sahu',
}).then(function(createWriter) {
    bookModel.create({
        bookname: 'Intersteller',
        isbn: '8770778980',
        writer_id: createWriter._id
    }).then(function(createBook) {
        createWriter.books_writen.push(createBook);
        createBook.save(function() {
            console.log(createWriter, createBook)
        })
    })
})

writerSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('user', writerSchema);



// const mongoose = require('mongoose');


// mongoose.connect('mongodb://localhost/stwt', { useNewUrlParser: true });

// let userSchema = mongoose.Schema({
//     username: String,
//     email: String,
//     password: String
// });