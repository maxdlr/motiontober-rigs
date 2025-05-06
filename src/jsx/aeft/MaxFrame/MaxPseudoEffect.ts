import { MainPseudoEffect } from "../Rigs/JolieBoule/enums/maxOrbeNames";
import { MaxEffectsMatchNames } from "./ADBE-match-names/MaxEffectsMatchNames";

export const MaxPseudoEffect = {
  pseudoEffect: {} as {
    matchName: string;
    presetName: string;
    presetBinary: string;
  },

  effect: {} as PropertyGroup,

  new: function (config: {
    matchName: string;
    presetName: string;
    presetBinary: string;
  }) {
    this.pseudoEffect = config;
    return this;
  },

  applyTo: function (layer: Layer) {
    const layerEffect: PropertyGroup = layer.property(
      MaxEffectsMatchNames.parade,
    ) as PropertyGroup;

    if (layerEffect.canAddProperty(this.pseudoEffect.matchName)) {
      layerEffect.addProperty(this.pseudoEffect.matchName);
    } else {
      applyPseudoEffect(this.pseudoEffect, layerEffect);
    }

    this.effect = layerEffect.property(this.pseudoEffect.matchName) as PropertyGroup;
    this.effect.name = MainPseudoEffect;

    return this;
  },

  build: function (): PropertyGroup {
    return this.effect;
  }
};

const applyPseudoEffect = (
  myPseudoEffect: {
    matchName: string | null;
    presetName: string;
    presetBinary: string;
  },
  effectsProp: PropertyGroup,
) => {
  const userDataFolder = getUserDataFolder();
  const animationPreset: File = createResourceFile(
    myPseudoEffect.presetName,
    myPseudoEffect.presetBinary,
    userDataFolder as string,
  ) as File;

  const masterLayer = effectsProp.parentProperty;
  // const currentComp = masterLayer.containingComp;

  const tempSolid = (app.project.activeItem as CompItem)?.layers.addSolid(
    [0, 0, 0],
    "Temp Solid",
    10,
    10,
    1,
  );
  const tempSolidSource = tempSolid.source;
  const tempSolidFolder = tempSolidSource.parentFolder;
  tempSolid.applyPreset(animationPreset);
  myPseudoEffect.matchName = tempSolid
    .property("ADBE Effect Parade")
    .property(1).matchName;

  masterLayer.selected = true;

  effectsProp.addProperty(myPseudoEffect.matchName as string);

  tempSolidSource.remove();
  if (tempSolidFolder.numItems === 0) tempSolidFolder.remove();
};

function getUserDataFolder() {
  try {
    const userDataFolder = Folder.userData;

    // Create a valid path for the Aescripts folder
    const aescriptsFolder = new Folder(
      userDataFolder.absoluteURI + "/Aescripts/test",
    );

    // Debug log
    alert("Attempting to use folder: " + aescriptsFolder.absoluteURI);

    if (!aescriptsFolder.exists) {
      // Try to create the folder
      if (!aescriptsFolder.create()) {
        alert(
          "Failed to create folder: " +
          aescriptsFolder.absoluteURI +
          "\nUsing temporary folder instead.",
        );
        return Folder.temp.absoluteURI;
      }
    }

    // Test write permissions by creating a test file
    const testFile = new File(aescriptsFolder.absoluteURI + "/test.txt");
    let canWrite = false;

    try {
      if (testFile.open("w")) {
        testFile.write("Test");
        testFile.close();
        testFile.remove();
        canWrite = true;
      }
    } catch {
      canWrite = false;
    }

    if (!canWrite) {
      alert(
        "Cannot write to folder: " +
        aescriptsFolder.absoluteURI +
        "\nUsing temporary folder instead.",
      );
      return Folder.temp.absoluteURI;
    }

    return aescriptsFolder.absoluteURI;
  } catch (err) {
    alert("Error setting up folder: " + err.toString());
    return Folder.temp.absoluteURI;
  }
}

function createResourceFile(filename, binaryString, resourceFolder) {
  try {
    // Ensure the folder exists
    const folder = new Folder(resourceFolder);
    if (!folder.exists) {
      folder.create();
    }

    // Create the file path with proper URI
    const myFile = new File(resourceFolder + "/" + filename);

    // Check security preferences
    if (!isSecurityPrefSet()) {
      alert(
        "This script requires access to write files.\n" +
        'Go to the "General" panel of the application preferences and make sure\n' +
        '"Allow Scripts to Write Files and Access Network" is checked.',
      );
      app.executeCommand(2359); // Open preferences
      if (!isSecurityPrefSet()) {
        return null;
      }
    }

    // Write the file
    myFile.encoding = "BINARY";
    if (myFile.open("w")) {
      myFile.write(binaryString);
      myFile.close();

      // Verify the file exists after writing
      if (myFile.exists) {
        alert("Successfully created file: " + myFile.absoluteURI);
        return myFile;
      } else {
        alert(
          "Failed to verify file exists after writing: " + myFile.absoluteURI,
        );
        return null;
      }
    } else {
      alert("Failed to open file for writing: " + myFile.absoluteURI);
      return null;
    }
  } catch (err) {
    alert("Error in createResourceFile: " + err.toString());
    return null;
  }
}

function isSecurityPrefSet() {
  try {
    const securitySetting = app.preferences.getPrefAsLong(
      "Main Pref Section",
      "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
    );
    return securitySetting === 1;
  } catch (err) {
    alert("Error checking security preferences: " + err.toString());
    return false;
  }
}
