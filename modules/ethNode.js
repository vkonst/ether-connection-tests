/* global module */
module.exports = (() => {
    "use strict";

    const conf = require('../conf');

    const fs = require('fs');
    const Web3 = require('web3');
    const ethUtils = require('ethereumjs-util');
    const EthereumTx = require('ethereumjs-tx');
    const web3 = new Web3(
        new Web3.providers.HttpProvider(getProviderAddress())
    );

    return {
        web3: web3,
        ethUtils: ethUtils,
        createTx: createTx,
        signTx: signTx,
        sendTx: sendTx
    };

    function getProviderAddress() {
        const provider = process.env.RPC_PROVIDER || '';
        let addr;
        switch (provider.toLowerCase()) {
            case 'ssh':
                addr = conf.sshTunnel; break;
            case 'localnet':
                addr = conf.localNetRpcServer; break;
            case 'infura':
            case 'testnet':
            default:
                addr = "https://ropsten.infura.io/"+conf.infuraApiKey;
        }
        return addr;
    }

    function createTx({from, to, value=0, data, gasLimit, gasPrice=1000000000000, chainId = 3}) {
        if (!gasLimit) gasLimit = 21000 + (data ? data.length * 68 : 100);
        console.log("Gas limit: %s", gasLimit);

        return new Promise( (resolve, reject) =>
            web3.eth.getTransactionCount(from, (err, txCount) =>
                !err ? resolve(
                    new EthereumTx({
                        nonce: web3.toHex(txCount),
                        gasLimit: web3.toHex(gasLimit),
                        gasPrice: web3.toHex(gasPrice),
                        to: to,
                        from: from,
                        value: web3.toHex(web3.toBigNumber(value)),
                        data: data,
                        chainId: chainId
                    })
                ) : reject(err)
            )
        )
    }

    function signTx(tx) {
        console.log(JSON.stringify(tx, null, 2));
        return new Promise( (resolve, reject) =>
            fs.readFile(conf.keyFile, (err, buf) => {
                if (!err) {
                    let privateKey = Buffer.from(buf.toString().replace(/^\s+|\s+$/g, ''), 'hex');
                    tx.sign(privateKey);
                    resolve('0x' + tx.serialize().toString('hex'));
                }
                else reject(err);
            })
        )
    }

    function sendTx(serializedTx) {
        return new Promise( (resolve, reject) =>
            web3.eth.sendRawTransaction(serializedTx, (err, res) => err ? reject(err) : resolve(res))
        )
    }
})();

// tx.getBaseFee().toNumber()
// let pubKey = tx.getSenderPublicKey().toString('hex')
// ethUtils.pubToAddress('0x' + pubKey).toString('hex')
