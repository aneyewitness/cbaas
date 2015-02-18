/*
token=oLSiGCKHPO2rewoB6xVoCn3U
team_id=T0001
channel_id=C2147483705
channel_name=test
timestamp=1355517523.000005
user_id=U2147483697
user_name=Steve
text=googlebot: What is the air-speed velocity of an unladen swallow?
trigger_word=googlebot:
*/

module.exports = function (req, res, next) {
	var thisbody 	= req.body || "text body";
	var channel 	= req.body.channel_name || "test channel";
	var timestamp 	= req.body.timestamp || 1355517523;
	timestamp 	= new Date(timestamp);
	var userName 	= req.body.user_name || "test name";
	var question 	= req.body.text || "test body";
	var answer 	= 	'{QUESTION: \"'+ question +'\" in channel '+channel+' at '+timestamp+'} \n' +
				'{ANSWER: Hello, ' + userName + '!}';
	
	if(question.toLowerCase().indexOf("object") > -1){
		answer = answer + '\n {OBJECT:'+JSON.stringify(thisbody)+'} \n';
	}
	var botPayload	= {text : answer};
 
  // avoid infinite loop
	if (userName !== 'slackbot') {
		return res.status(200).json(botPayload);
	} else {
		return res.status(200).end();
	}
}