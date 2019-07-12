#!/bin/bash
npm run testing

sftp master-5 <<EOF
cd dev-store
lcd dist
put -r *
bye
EOF