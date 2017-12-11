'use strict';

const gulp = require('gulp'),
	runSequence = require('run-sequence'),
	eslint = require('gulp-eslint'),
	spawn = require('child_process').spawn,
	exec = require('child_process').exec;
let protractor;

function killProcessByName(name) {
	exec('pgrep ' + name, (error, stdout, stderr) => {
		if (error) throw error;
		if (stderr) console.log('stderr: ', stderr);
		if (stdout) {
			//console.log('killing running processes: ', stdout);
			const runningProcessesIDs = stdout.match(/\d+/);
			runningProcessesIDs.forEach((id) => {
				exec('kill -9 ' + id, (error, stdout, stderr) => {
					if (error) throw error;
					if (stderr) console.log('stdout: ', stdout);
					if (stdout) console.log('stderr: ', stderr);
				});
			});
		}
	});
}

gulp.task('lint', () => {
	/*
	*	uses ignore list from .eslintignore
	*/
	return gulp.src(['./bot/*.js', './*.js'])
		.pipe(eslint('./.eslintrc.json'))
		.pipe(eslint.format());
});

gulp.task('watch-and-lint', () => {
	/*
	*	watch files to be linted, and eslint config files and lint on change
	*/
	gulp.watch(['./bot/*.js', './.eslintignore', './.eslintrc.json'], ['lint']);
});

gulp.task('protractor', () => {
	if (protractor) protractor.kill();
	protractor = spawn('npm', ['run', 'protractor'], {stdio: 'inherit'});
});

gulp.task('default', (done) => {
	runSequence('protractor', done);
});

process.on('SIGINT', () => {
	killProcessByName('gulp');
});
