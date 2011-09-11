./mkDeps.sh
python2.6 build.py test mario pit test 2> warnings.txt
cat warnings.txt
cp bin/test.js test.js
