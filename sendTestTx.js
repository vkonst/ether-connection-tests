const conf = require('./conf');
const payload = require('./assets/payload');
const ethNode = require('./modules/ethNode');

const data = process.env.SEND_CONTENT ? payload.getContent() : payload.getIpfsAddr();

ethNode.createTx({
    from: conf.fromAddr,
    to: conf.toAddr,
    value: conf.weiValue,
    data: ethNode.ethUtils.fromAscii(data),
    gasPrice: 20 * 1000000000
})
  .then(ethNode.signTx)
  .then(ethNode.sendTx)
  .then(console.log)

  .catch(console.error);
