const updateThemeJSONHandlers = {
    hidesExplorerArrows: (themeJSON: any, value: any) => {
        themeJSON.hidesExplorerArrows = value;
    },
    "folders.associations": (themeJSON: any, folders: any) => {
        for (const folder in folders) {
            themeJSON.folderNames[folder] = folders[folder];
        }
    },
    "files.associations": (themeJSON: any, files: any) => {
        for (const file in files) {
            if (file.startsWith("*.")) {
                const newExtension = file.replace("*.", "");
                themeJSON.fileExtensions[newExtension] = files[file];
            } else {
                themeJSON.fileNames[file] = files[file];
            }
        }
    },
};

module.exports = {
    updateThemeJSONHandlers,
};