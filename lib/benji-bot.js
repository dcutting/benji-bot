'use strict';

var util = require('util');
var Bot = require('slackbots');

var BenjiBot = function Constructor(settings) {
	this.settings = settings;
	this.settings.name = settings.name;
	this.user = null;
	this.db = null;
};

util.inherits(BenjiBot, Bot);

module.exports = BenjiBot;

BenjiBot.prototype.run = function() {
	BenjiBot.super_.call(this, this.settings);

	this.on('start', this._onStart);
	this.on('message', this._onMessage);
};

BenjiBot.prototype._onStart = function() {
	this._loadBotUser();
};

BenjiBot.prototype._loadBotUser = function() {
	var self = this;
	this.user = this.users.filter(function(user) {
		return user.name === self.name;
	})[0];
};

BenjiBot.prototype._onMessage = function(message) {
	if (this._isChatMessage(message) &&
		this._isChannelConversation(message) &&
		!this._isFromBenjiBot(message) &&
		this._isMentioningSky(message)
	   ) {
		this._replyWithSkyMessage(message);
	}
};

BenjiBot.prototype._isChatMessage = function(message) {
	return message.type === 'message' && Boolean(message.text);
};

BenjiBot.prototype._isChannelConversation = function(message) {
	return typeof message.channel === 'string' && message.channel[0] === 'C';
};

BenjiBot.prototype._isFromBenjiBot = function(message) {
	return message.user === this.user.id;
};

BenjiBot.prototype._isMentioningSky = function(message) {
	return message.text.toLowerCase().indexOf('sky') > -1 || message.text.toLowerCase().indexOf(this.name) > -1;
};

BenjiBot.prototype._replyWithSkyMessage = function(originalMessage) {
	var self = this;
	var channel = self._getChannelById(originalMessage.channel);
	var messages = [
		"Believe in Better. Woof!",
		"The Sky's the limit!",
		"Can't wait for SkyQ!",
		"Woof!",
		"Sky! Sky! Sky! Sky!"
	];
	var message = messages[Math.floor(Math.random()*messages.length)];
	self.postMessageToChannel(channel.name, message, {as_user: true});
};

BenjiBot.prototype._getChannelById = function(channelId) {
	return this.channels.filter(function(item) {
		return item.id === channelId;
	})[0];
};
