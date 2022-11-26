import Snoowrap from 'snoowrap';
const r = new Snoowrap({
	userAgent: 'Reddit-Discord Cute Bot, by /u/Galarian_Eevee',
	clientId: process.env.REDDIT_ID,
	clientSecret: process.env.REDDIT_SECRET,
	username: process.env.REDDIT_USERNAME,
	password: process.env.REDDIT_PASSWORD,
});

export default r;