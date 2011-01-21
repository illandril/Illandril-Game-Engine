import os,sys

if ( len( sys.argv ) < 3 ):
  print "Usage: build.py name root namespace [namespace]...";
  sys.exit(2);
 
debug = True

builder = "../closure-library/closure/bin/build/closurebuilder.py"
args = " --root=../closure-library/"
args = args + " --root=src/"
args = args + " --root=" + sys.argv[2]
for arg in sys.argv[3:]:
  args = args + " --namespace=" + arg
args = args + " --output_mode=compiled"
args = args + " --compiler_jar=../closure-compiler/compiler.jar"
args = args + " --compiler_flags=--formatting=PRETTY_PRINT"

if debug:
  args = args + " --compiler_flags=--compilation_level=SIMPLE_OPTIMIZATIONS"
else:
  args = args + " --compiler_flags=--compilation_level=ADVANCED_OPTIMIZATIONS"
  
  # Disable debugging
  args = args + " --compiler_flags=--define='illandril.DEBUG=false'"
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
