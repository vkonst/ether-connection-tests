#!/bin/sh

[ -z "$1" ] && host="localhost:8545" || host="$1";
[ -z "$2" ] && fname="tcpdump-`date +%s`.lst" || fname="$2";

port=${host#*:*}
host=${host%%:*}
filter="host ${host}"
[ -z "$port" ] || filter="${filter} and port ${port}";

sudo tcpdump -s0 -U -n -w - -G 30 -W 1 -i en0 "${filter}" > ${fname}
