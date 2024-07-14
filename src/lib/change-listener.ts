const { themeJSONToConfig, getWorkspaceConfiguration, updateConfig } = require("./config");
const { getThemeFile } = require("./theme");
const { log } = require("./log");

function monitorConfigChanges() {
    const themeJSON = getThemeFile();
    const currentState = themeJSONToConfig(themeJSON);
    const workspaceState = getWorkspaceConfiguration();

    const updatedKeys: { [key: string]: any } = {};

    for (const currentKey in currentState) {
        updatedKeys[currentKey] = workspaceState[currentKey];
    }

    updateConfig(updatedKeys);
}

module.exports = {
    monitorConfigChanges,
};
