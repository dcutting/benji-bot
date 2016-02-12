'use strict';

var BenjiBot = require('../lib/benji-bot');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME || 'benji';

var benjiBot = new BenjiBot({
	token: token,
	name: name
});

benjiBot.run();
