import os,sys

os.system( sys.executable + " closure-library/closure/bin/build/closurebuilder.py --root=closure-library/ --root=src/ --namespace=illandril.game.Engine --output_mode=compiled --compiler_jar=closure-compiler/compiler.jar --compiler_flags=--compilation_level=SIMPLE_OPTIMIZATIONS --compiler_flags=--formatting=PRETTY_PRINT > bin/engine.js" )

def readfile( filename, output ):
	f = file(filename)
	while True:
		line = f.readline()
		if len(line) == 0:
			break
		output.write(line)
	f.close()

out = file("bin/engine.css", "w")
for subdir, dirs, files in os.walk("styles/"):
	for filename in files:
		if filename.endswith( ".css" ):
			readfile( "styles/" + filename, out )
out.close()
