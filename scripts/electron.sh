#!/bin/bash
echo $2
function usage() {
    echo -e "Usage:"
    echo -e "\t$0 build\t<dest_dir>"
    echo -e "\t$0 pkg\t<app_name>\t<mac|win|linux>"
    echo -e "\t$0 installer\t<app_name>"
}

function build() {
    tsc main.ts;
    ng build --prod --base-href ./;
    cp package.json $1;
    cp main.js $1;
}

if [ "$1" != "build" ] && [ "$1" != "pkg" ] && [ "$1" != "installer" ]; then
    usage
fi

if [ "$1" != "build" ]; then
    build $2
fi
