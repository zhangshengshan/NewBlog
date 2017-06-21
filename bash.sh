#!/bin/bash - 
#===============================================================================
#
#          FILE: bash.sh
# 
#         USAGE: ./bash.sh 
# 
#   DESCRIPTION: 
# 
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: YOUR NAME (), 
#  ORGANIZATION: 
#       CREATED: 2017/04/20 15:34
#      REVISION:  ---
#===============================================================================

set -o nounset                              # Treat unset variables as an error


hexo generate
hexo deploy
CI_MESSAGE=`date`
