const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost/pagination", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const postSchema = new mongoose.Schema({
	text: String,
	post: String
});

const Post = mongoose.model("Post", postSchema);

const db = mongoose.connection;

db.once("open", () => {
	Post.find({}, function(err, posts) {
		if(posts.length === 0) {
			Promise.all([
			    Post.create({ text: 'Post1', post: 'Lets do something' }),
			    Post.create({ text: 'Post2', post: 'Lorem Ipsum' }),
			    Post.create({ text: 'Post3', post: 'Nanin shubhamiya isabnida' }),
			    Post.create({ text: 'Post4', post: 'choi kaega muli mashipshibnida' }),
			    Post.create({ text: 'Post5', post: 'No not agian' }),
			    Post.create({ text: 'Post6', post: 'Portugal gonna win' }),
			    Post.create({ text: 'Post7', post: 'Germany gonna loose' }),
			    Post.create({ text: 'Post8', post: 'pagination done' }),
			    Post.create({ text: 'Post9', post: 'Lets crack it' }),
			    Post.create({ text: 'Post10', post: 'Lets do something' }),
			    Post.create({ text: 'Post11', post: 'No not again' }),
			    Post.create({ text: 'Post12', post: 'Last one' })
		  	]).then(() => console.log('Added Users'));	
		} else {
			console.log('Posts already exists');
		}
	});
});


app.get('/posts', async (req, res) => {
	const PAGE_SIZE = 3;
	const page = parseInt(req.query.page);

	const posts = await Post.find({})
		.limit(PAGE_SIZE)
		.skip(PAGE_SIZE * page);

	const total = await Post.countDocuments({});
	res.json({
		total_pages: Math.ceil(total / PAGE_SIZE),
		posts
	});
}); 

app.listen(4000, () => {
	console.log('Server has started on port 4000');
});
