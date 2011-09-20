import os,sys

if ( len( sys.argv ) < 2 ):
  print "Usage: build.py name namespace [namespace]...";
  sys.exit(2);
 
debug = False

builder = "../box2dweb-closure/closure-library/closure/bin/build/closurebuilder.py"
args = " --root=../box2dweb-closure/closure-library/"
args = args + " --root=../box2dweb-closure/src/"
args = args + " --root=src/"
for arg in sys.argv[2:]:
  args = args + " --namespace=" + arg
args = args + " --output_mode=compiled"
args = args + " --compiler_jar=../closure-compiler/compiler.jar"
args = args + " --compiler_flags=--output_wrapper='(function(){%output%})();'"
args = args + " --compiler_flags=--warning_level=VERBOSE"

if debug:
  args = args + " --compiler_flags=--compilation_level=SIMPLE_OPTIMIZATIONS"
  args = args + " --compiler_flags=--formatting=PRETTY_PRINT"
  args = args + " --compiler_flags=--define='goog.DEBUG=true'"
else:
  args = args + " --compiler_flags=--compilation_level=ADVANCED_OPTIMIZATIONS"
  args = args + " --compiler_flags=--define='goog.DEBUG=false'"

os.system( sys.executable + " " + builder + args + " > bin/" + sys.argv[1] + ".js" )

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
