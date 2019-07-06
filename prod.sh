#!/bin/bash
npm run build

sftp master-5 <<EOF
cd store
lcd dist
put -r *
bye
EOF