const vscode = require("vscode");
const { monitorConfigChanges } = require("./lib/change-listener");
const { syncOriginal } = require("./lib/theme");
const { log } = require("./lib/log");
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context: any) {
	log.info("pedronieto.capy-theme activated");
	await syncOriginal();
	monitorConfigChanges();

	vscode.workspace.onDidChangeConfiguration(monitorConfigChanges);
	log.info(monitorConfigChanges);

	vscode.window.onDidChangeWindowState((state: any) => {
		if (state.focused) {
			monitorConfigChanges();
		}
	});
}

function deactivate() {}

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate,
};