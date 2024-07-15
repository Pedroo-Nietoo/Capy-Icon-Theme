const vscode = require("vscode");

const channel = vscode.window.createOutputChannel("Capy Theme");
const log = {
	info: (...args: any) => {
		const time = new Date().toLocaleTimeString();
		channel.appendLine(`[INFO ${time}] ${args.join(" ")}`);
	},
};

module.exports = {
	log,
};