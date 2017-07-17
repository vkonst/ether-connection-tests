> $ cd ether-connection-tests/ <br />

>\# Send tx to the RPC server on the local net over HTTP and capture network packets <br />
>\# run both commands in the same time (in two terminal windows) <br />
> $ ./tcpdump/captureNetwTraf.sh 192.x.x.B:8545 ./tcpdump/tcpdump.sending_tx_with_ipfsAddr_to_local_server.lst <br />
> $ <br />

> $ ./tcpdump/captureNetwTraf.sh 192.x.x.B:8545 ./tcpdump/tcpdump.sending_tx_with_2k_data_to_local_server.lst <br />
> $ RPC_PROVIDER=localnet;SEND_CONTENT=yes node ./sendTestTx.js <br />

>\# Send tx to the RPC server via a SSH tunnel over HTTP and capture network packets <br />
> $ ./tcpdump/captureNetwTraf.sh 192.x.x.B:22   ./tcpdump/tcpdump.sending_tx_with_ipfsAddr_over_ssh.lst <br />
> $ RPC_PROVIDER=ssh node ./sendTestTx.js <br />

> $ ./tcpdump/captureNetwTraf.sh 192.x.x.B:22   ./tcpdump/tcpdump.sending_tx_with_2kb_data_over_ssh.lst <br />
> $ RPC_PROVIDER=ssh;SEND_CONTENT=yes node ./sendTestTx.js <br />


>\# Send tx to the Infura RPC server over HTTPS and capture network packets <br />
> $ ./tcpdump/captureNetwTraf.sh ropsten.infura.io:443 ./tcpdump/tcpdump.sending_tx_with_ipfsAddr.lst <br />
> $ RPC_PROVIDER=infura node ./sendTestTx.js<br />

> $ ./tcpdump/captureNetwTraf.sh ropsten.infura.io:443 ./tcpdump/tcpdump.sending_tx_with_2k_data.lst <br />
> $ RPC_PROVIDER=infura;SEND_CONTENT=yes node ./sendTestTx.js <br />


>\# Upload the file to IPFS via Infura IPFS node and capture network packets <br />
> $ cd assets/; curl -F "randoms2k=@random5.txt" https://ipfs.infura.io:5001/api/v0/add <br />
