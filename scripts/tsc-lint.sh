#!/bin/bash -e

TMP=.tsconfig-lint.json
cat >$TMP <<EOF
{
  "extends": "./tsconfig.json",
  "include": [
    "./next-env.d.ts",
EOF
for file in "$@"; do
  echo "    \"$file\"," >> $TMP
done
cat >>$TMP <<EOF
    "unused"
  ]
}
EOF
npx tsc --project $TMP --skipLibCheck --noEmit
