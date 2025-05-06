myAwesomeScript();
function myAwesomeScript() {
  // Define your Pseudo Effect here
  var myPseudoEffect = {
    matchName: null,
    presetName: "Scribe.ffx",
    presetBinary: ["BINARY"],
  };

  var myComp = app.project.activeItem;
  if (!myComp || !(myComp instanceof CompItem)) {
    myComp = app.project.items.addComp("My Comp", 1920, 1080, 1, 10, 24);
    myComp.openInViewer();
  }

  var myLayer = myComp.selectedLayers[0];
  if (!myLayer)
    myLayer = myComp.layers.addSolid(
      [0, 0, 0],
      "My Layer",
      myComp.width,
      myComp.height,
      1,
    );

  var effectsProp = myLayer.property("ADBE Effect Parade");

  // APPLY PSEUDO EFFECT
  if (effectsProp.canAddProperty(myPseudoEffect.matchName)) {
    effectsProp.addProperty(myPseudoEffect.matchName);
  } else {
    applyPseudoEffect(myPseudoEffect, effectsProp);
  }

  ///// HELPER FUNCTIONS /////
  function applyPseudoEffect(myPseudoEffect, effectsProp) {
    var userDataFolder = getUserDataFolder();
    var animationPreset = createResourceFile(
      myPseudoEffect.presetName,
      myPseudoEffect.presetBinary,
      userDataFolder,
    );

    var masterLayer = effectsProp.parentProperty;
    var curentComp = masterLayer.containingComp;

    var tempSolid = curentComp.layers.addSolid(
      [0, 0, 0],
      "Temp Solid",
      10,
      10,
      1,
    );
    var tempSolidSource = tempSolid.source;
    var tempSolidFolder = tempSolidSource.parentFolder;

    tempSolid.applyPreset(File(animationPreset));
    myPseudoEffect.matchName = tempSolid
      .property("ADBE Effect Parade")
      .property(1).matchName;

    masterLayer.selected = true;
    effectsProp.addProperty(myPseudoEffect.matchName);

    tempSolidSource.remove();
    if (tempSolidFolder.numItems === 0) tempSolidFolder.remove();
  }

  function getUserDataFolder() {
    try {
      var userDataFolder = Folder.userData;
      var aescriptsFolder = Folder(
        userDataFolder.toString() + "/Aescripts/test/",
      );
      if (!aescriptsFolder.exists) {
        var checkFolder = aescriptsFolder.create();
        if (!checkFolder) {
          alert(
            'Error creating "' +
              checkFolder.fsName +
              "\nPlease check the permissions for this folder:\n" +
              userDataFolder +
              "\n\nA temp folder will be used instead",
          );
          aescriptsFolder = Folder.temp;
        }
      }
      return aescriptsFolder.toString();
    } catch (err) {
      alert(
        "Permissions issue with user data folder\nPlease give AE full read and write permissions to the ~/Library/Application Support/Aescripts/test folder.",
      );
    }
  }

  function createResourceFile(filename, binaryString, resourceFolder) {
    try {
      var myFile = new File(resourceFolder + "/" + filename);
      if (!File(myFile).exists) {
        if (!isSecurityPrefSet()) {
          alert(
            "This script requires access to write files.\n" +
              'Go to the "General" panel of the application preferences and make sure\n' +
              '"Allow Scripts to Write Files and Access Network" is checked.',
          );
          app.executeCommand(2359);
          if (!isSecurityPrefSet()) return null;
        }
        myFile.encoding = "BINARY";
        myFile.open("w");
        myFile.write(binaryString);
        myFile.close();
      }
      return myFile;
    } catch (err) {
      alert("Error in createResourceFile function\n" + err.toString());
    }
  }

  function isSecurityPrefSet() {
    try {
      var securitySetting = app.preferences.getPrefAsLong(
        "Main Pref Section",
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
      );
      return securitySetting == 1;
    } catch (err) {
      alert("Error in isSecurityPrefSet function\n" + err.toString());
    }
  }
}
