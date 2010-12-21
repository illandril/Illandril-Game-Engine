import os,sys

builder = "closure-library/closure/bin/build/closurebuilder.py"
args = " --root=closure-library/"
args = args + " --root=src/"
args = args + " --namespace=illandril.game.Engine"
args = args + " --namespace=illandril"
args = args + " --output_mode=compiled"
args = args + " --compiler_jar=closure-compiler/compiler.jar"
args = args + " --compiler_flags=--compilation_level=SIMPLE_OPTIMIZATIONS"
#args = args + " --compiler_flags=--compilation_level=ADVANCED_OPTIMIZATIONS"
args = args + " --compiler_flags=--formatting=PRETTY_PRINT"
os.system( sys.executable + " " + builder + args + " > bin/engine.js" )

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
