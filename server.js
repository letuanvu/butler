const Http = require('./Http');
const PORT = process.env.PORT || 80;


new Http().getApp().listen(PORT, () => {
	console.log(`bulter listening on port ${PORT}`);
})
