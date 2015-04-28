#!/bin/sh

mysql -u root -p1234 < /home/administrator/Documents/Dump/dump-$( date '+%Y-%m-%d_%H-%M-%S' ).sql

echo "database was restored"
