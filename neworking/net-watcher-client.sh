#!/usr/bin/env bash

# With port
#nc localhost 60300
# With Unix Socket -> netcat-openbsd package
nc -U /tmp/watcher.sock
