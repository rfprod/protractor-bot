'use strict';

module.exports = (cwd, spawn, exec, schedule, mailTransporter) => {

	/*
	* send report
	*/
	let mailOptions;
	function sendEmailReport(recipientEmail, plainTextReport, htmlReport){ // eslint-disable-line no-unused-vars
		mailOptions = {
			from: '"Protractor bot email reporter 👥" <' + process.env.MAILER_EMAIL + '>',
			to: recipientEmail,
			subject: 'Protractor bot: daily test ✔',
			text: 'Protractor bot: daily test.\n\n' + plainTextReport,
			html: '<h3>Protractor bot: daily test.</h3>' + htmlReport /*,
			attachments: [{ cwd: attachmentPath }]*/ // use attachments like so
		};
		mailTransporter.sendMail(mailOptions, (err, info) =>{
			if(err){return console.log(err);}
			console.log('Message sent: ' + info.response);
		});
	}

	let rule = new schedule.RecurrenceRule();
	rule.dayOfWeek = [0, new schedule.Range(1, 6)]; // every day
	// rule.dayOfWeek = [0]; once a week on a particular day, 0 - Sunday
	rule.hour = 23;
	rule.minute = 0;
	rule.second = 0;
	let plainTextReport = 'Protractor bot report';
	let htmlReport = '<html><body><h1>Protractor bot report</h1>';

	let protractor;

	let reportJob = schedule.scheduleJob(rule, () => {
		console.log('event: scheduled report time');
		
		/*
		*	run protractor
		*/
		if (protractor) protractor.kill();
		protractor = spawn('npm', ['run', 'protractor-noinstall'], {stdio: 'inherit'});
		protractor.on('close', (code) => {
			console.log('protractor closed with code', code);
			/*
			*	TODO:email report sending works, but authentication should be debugged further,
			*	see https://developers.google.com/gmail/api/quickstart/nodejs for info on obtaining an access token
			*/
			plainTextReport += `
protractor closed with code ${code}.
Date: ${new Date().toUTCString()}`;
			htmlReport += `
<p>Protractor closed with code ${code}</p>
<p>Date: ${new Date().toUTCString()}</p>
</body></html>`;
			sendEmailReport(process.env.MAILER_RECIPIENT_EMAIL, plainTextReport, htmlReport);
		});

	});
	console.log('job scheduled', reportJob);
};
