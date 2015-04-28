#!/bin/sh

mysqldump --all-databases > /home/administrator/Documents/Dump/dump-$( date '+%Y-%m-%d_%H-%M-%S' ).sql -u root -p1234

echo "database was created"
