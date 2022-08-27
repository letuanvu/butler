const Http = require('./Http');
const PORT = 3000;


new Http().getApp().listen(PORT, () => {
	console.log(`bulter listening on port ${PORT}`);
})
