'use strict';

var pty = require('node-pty');
var Term = require('xterm');

var el = document.getElementById('term');

var shellOpts = {
  cols: 88,
  rows: 26,
  screenKeys: true,
  cursorBlink: false,
  focusKeys: false,
  noEvents: false,
  useStyle: true,
  name: 'xterm-color',
};

window.addEventListener('resize', function(){
  term.resize(
    Math.floor(el.clientWidth / 7.1),
    Math.floor(el.clientHeight / 13)
  );
});

var shell = pty.fork(process.env.SHELL || 'bash', [], shellOpts);
var term = new Term(shellOpts);
term.open(el);

var cmd = '';

shell.on('data', function(data) {
  if (data === ':') {
    cmd += data;
    return
  }
  term.write(data);
});

shell.on('close', function() {
  window.close();
});

term.on('data', function(data) {
  shell.write(data);
});
