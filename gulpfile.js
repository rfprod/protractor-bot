'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

let node;

function killProcessByName(name) {
  exec('pgrep ' + name, (error, stdout, stderr) => {
    if (error) console.log('error: ', stderr);
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

gulp.task('default', ['server'], (done) => {
  done();
});

/*
*	server
*/
gulp.task('server', (done) => {
  if (node) node.kill();
  node = spawn('node', ['server.js'], {stdio: 'inherit'});
  node.on('close', (code) => {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
  done();
});

gulp.task('server-kill', (done) => {
  if (node) node.kill();
  done();
});

process.on('SIGINT', () => {
  killProcessByName('gulp');
});
