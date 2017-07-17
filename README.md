# ether-connection-tests
A few basic tests to evaluate traffic/bandwidth for "Ethereum-enabled" hosts/appliances

### Scope
A Linux embeded remote device shall send/read transactions to an Ethereum network.<br />
Running a full Ethereum node on the device seems to be hardly possible and/or ineffective since<br />
the device is
 - too "resource-constrained" for a full node 
 - connected to Interent over GSM network with limited trafic / bandwidth
 - sending / receiving data ocasionally/periodically
<br />

Running a kind of a "light client" on the device that interacts with Ethereum via some remote nodes/services may be an acceptable option. 
The following tests aimed at evaluating options like this. 

### Tests
<b>Network traffic captured and analyzed for:<b>
- test 1a. Tx with the IPFS address sent via HTTP  
- test 1b. Tx with 2Kb of text data sent via HTTP  
- test 2a. Tx with the IPFS address sent via HTTPS  
- test 2b. Tx with 2Kb of text data sent via HTTPS  
- test 3a. Tx with the IPFS address sent via HTTP over SSH tunnel  
- test 3b. Tx with 2Kb of text data sent via HTTP over SSH tunnel  
- test 4. 2Kb text file uploaded to IPFS via Infura node over HTTPS
- test 5. 2Kb + signature(s) sent to a MQTT server (w/o SSL/TLS encryption)

<pre>
Tests 1 .. 4 provide sending an Ethereum tx to a remote RPC server (node).<br />
"Under the hood", two RPC requests get sent for a transaction:
- eth_getTransactionCount - to obtain the nonce for a tx
- eth_sendRawTransaction - to broadcast the signed tx
<br />
<b><i>As an alternative option to Ethereum RPC requests,</i><br /></b>
test 5 provides sending the same 2Kb data, by several messages, to a remote MQTT server.
SSL/TLS encryption is not applied.<br />
For the sake of security, a strong signature to be included in every MQTT message. 
</pre>

### Outcomes
Refer to <a href="tcpdump/network_statistics.md">network statistics</a>. 
