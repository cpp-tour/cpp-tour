#!/bin/bash
readonly dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

IFS=$'\n'
for f in $(find "$dir/lessons" -name '*.cpp' -or -name '*.h'); do
    clang-format -i "$f"
done
