// Binary file reader and writer
try {
  // Open the source file in binary mode
  var sourceFile = new File("./src/jsx/aeft/Rigs/JolieBoule/pseudo23.ffx");
  sourceFile.encoding = "BINARY";
  sourceFile.open("r"); // Changed from "e" to "r" for read mode

  // Read the binary data
  var binaryData = sourceFile.read();
  if (binaryData !== null) {
    binaryData = binaryData.toSource();
  }

  // Create and write to the destination file
  var outputFile = new File("./src/jsx/aeft/Rigs/JolieBoule/jolieboule-binary-23.txt");
  outputFile.open("w");
  outputFile.encoding = "BINARY";
  outputFile.write(binaryData);

  // Close both files
  outputFile.close();
  sourceFile.close();

  alert("File successfully processed!");
} catch (err) {
  alert("Error: " + err.message);
}
