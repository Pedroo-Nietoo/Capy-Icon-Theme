const vscode = require("vscode");
const { log } = require("./log");
const defaultConfig = require("../icon-theme.json");
const pkgConfig = require("../../package.json");
const { getSoureFile, writeThemeFile } = require("./theme");
const { PKG_PROP_MAP } = require("./constants");
const { updateThemeJSONHandlers } = require("./theme-json-handlers");

const configDef = pkgConfig.contributes.configuration;
const configKeys = Object.keys(configDef.properties);
const defaultState = themeJSONToConfig(defaultConfig);

function getWorkspaceConfiguration() {
    const config: Record<string, any> = {};
    for (const key of configKeys) {
        if (!PKG_PROP_MAP[key]) {
            continue;
        }

        const valueGroup = vscode.workspace.getConfiguration("capy-theme").inspect(PKG_PROP_MAP[key]);

        config[PKG_PROP_MAP[key]] = valueGroup.workspaceValue || valueGroup.globalValue || defaultState[PKG_PROP_MAP[key]];
    }

    return config;
}

function themeJSONToConfig(themeDef: Record<string, any>) {
    const result: Record<string, any> = {};

    for (const key of configKeys) {
        if (!PKG_PROP_MAP[key]) {
            continue;
        }
        result[PKG_PROP_MAP[key]] = themeDef[PKG_PROP_MAP[key]];
    }

    return result;
}

function updateConfig(config: any) {
    const themeJSON = getSoureFile();

    for (const key in config) {
        log.info(`capy-theme.${key} changed, updating to ${config[key]}`);
        const updateHandler = updateThemeJSONHandlers[key];
        if (updateHandler) {
            vscode.workspace.getConfiguration("capy-theme").update(key, config[key], true);
            updateHandler(themeJSON, config[key]);
        }
    }

    writeThemeFile(themeJSON);
}

module.exports = {
    getWorkspaceConfiguration,
    themeJSONToConfig,
    updateConfig,
};