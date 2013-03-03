#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Testacular Server (E2E)"
echo "-------------------------------------------------------------------"

testacular start $BASE_DIR/../config/testacular-e2e.conf.js $*
