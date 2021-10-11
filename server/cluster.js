const cluster = require('cluster');
const os = require('os');
const pid = process.pid;

if (cluster.isMaster) {
  const cpuLength = os.cpus().length;
  for(let i = 0; i < 1; i++) {
    cluster.fork();
  }
}
if (cluster.isWorker) {
  require('./server.js');
}