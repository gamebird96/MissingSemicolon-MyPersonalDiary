var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema(
{
	uname:
	{
		type: String
	},
	title:
	{
		type: String
	},
	post:
	{
		type: String
	},
	image:
	{
		type: String
	},
	timestamp:
	{
		type: String
	},
	private:
	{
		type: Boolean
	}
});
Post.index({title: 'text', post: 'text'});
const post = module.exports = mongoose.model('Post', Post);