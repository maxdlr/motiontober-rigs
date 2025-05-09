var layer = app.project.activeItem.selectedLayers[0];

var properties = [];

for (var i = 0; i < layer.selectedProperties.length; i++) {
  var p = layer.selectedProperties[i];
  properties.push({
    name: p.name,
    value: p.value,
    expression: p.expression
  });
}

var result = JSON.stringify(properties);

try {
  // Create and write to the destination file
  var outputFile = new File("./result.json");
  outputFile.open("w");
  outputFile.write(result);

  // Close both files
  outputFile.close();

  alert("File successfully processed!");
} catch (err) {
  alert("Error: " + err.message);
}
