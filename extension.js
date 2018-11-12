// Import the module and reference it with the alias vscode in your code below
const { commands, window, StatusBarAlignment } = require('vscode');

exports.activate = function (context) {
  let wordCounter = new WordCounter();
  let disposable = commands.registerCommand('extension.sayHello', () => {
    wordCounter.updateWordCount();
  });
  context.subscriptions.push(wordCounter);
  context.subscriptions.push(disposable);
}

exports.deactivate = function () {

}

class WordCounter {

  constructor() {
    this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
  }

  updateWordCount() {
    let editor = window.activeTextEditor;

    if (!editor) {
      this._statusBarItem.hide();
      return;
    }

    let doc = editor.document;
    if (doc.languageId === 'markdown') {
      let wordCount = this._getWordCount(doc);
      this._statusBarItem.text = wordCount !== 1 ? `${wordCount} Words` : '1 Word';
      this._statusBarItem.show();
    } else {
      this._statusBarItem.hide();
    }
  }

  _getWordCount(doc) {
    let docContent = doc.getText();
    // Parse out unwanted whitespace so the split is accurate
    docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
    docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

    let wordCount = 0;
    if (docContent !== "") {
      wordCount = docContent.split(" ").length;
    }

    return wordCount;
  }

  dispose() {
    this._statusBarItem.dispose();
  }

}