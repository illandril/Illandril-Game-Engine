#!/bin/bash
set -e
COMPILER="builders/closure-compiler/compiler.jar"
OUTPUT="bin/engine.js"
FILES="--js hello.js"

java -jar $COMPILER $FILES --js_output_file $OUTPUT
