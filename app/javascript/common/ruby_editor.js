import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
var console_message = []
export default {
  create(code) {
    const editor = monaco.editor.create(document.getElementById('container'), {
      value: code || '# ここから書いてください\nputs "Hello, world"\n\n\n',
      language: 'ruby',
      theme: "vs-dark",
      tabSize: 2,
      insertSpaces: true,
      autoIndent: true,
      minimap: { enabled: false },
      automaticLayout: true,
    });
    editor.getAction('editor.action.formatDocument').run().then();

    monaco.editor.create(document.getElementById('console'), {
      value: "",
      language: 'ruby',
      theme: "vs-dark",
      minimap: { enabled: false },
      automaticLayout: true,
      readOnly: true,
      lineNumbers: "off",
    });
  },
  output(text) {
    const model = monaco.editor.getModels()[1];
    let message = ""
    try {
      // evalの結果がコンソールに出力されるので、変数(console_message)に入れるようにする
      console_message = [];
      var console = Opal.global.console;
      console.log = function(s){ console_message.push(s) };
      window.console = console;
      eval(text)
      message = console_message.join("")
    }
    catch (e) {
      console.log(e)
      console.log(e.message)
      message = e.message
    }
    model.setValue(message)
  },
  async compile() {
    const code = monaco.editor.getModels()[0].getValue();
    // console.log(code)
    try {
      return await $.ajax({
        url: "/api/v1/posts",
        data: JSON.stringify({ code: code }),
        type: 'POST',
        contentType: 'application/json'
      })
    } catch (e) {
      // console.log(e)
    }
  }
}

// function lineNumbersFunc(originalLineNumber) {
// 	return "";
// }
