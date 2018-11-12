// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
    vscode.window.showInformationMessage('Hello World!');
  });
  context.subscriptions.push(disposable);

  let disposableHi = vscode.commands.registerCommand('extension.sayHi', function () {

    let editor = vscode.window.activeTextEditor;

    if (!editor) {
      return;
    }

    let selection = editor.selection;
    let text = editor.document.getText(selection);

    vscode.window.showInformationMessage('你选中了' + text.length + '字符');

  })
  context.subscriptions.push(disposableHi);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;