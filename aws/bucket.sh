#!/bin/bash
set -x
awslocal s3 mb s3://soundverse-nft
awslocal s3 mb s3://soundverse-user
set +x