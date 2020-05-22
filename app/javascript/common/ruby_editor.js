import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

export default {
  create(code) {
    monaco.editor.create(document.getElementById('container'), {
      value: code || '# ここから書いてください\nputs "Hello, world"\n\n\n',
      language: 'ruby',
      theme: "vs-dark",
      useTabStops: true,
      tabCompletion: "on",
      tabSize: 2,
      minimap: { enabled: false },
      automaticLayout: true,
    });
  
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
    model.setValue(text)
  },
  async exec() {
    const code = monaco.editor.getModels()[0].getValue();
    console.log(code)
    try {
      return await $.ajax({
        url: "/api/v1/posts",
        data: JSON.stringify({ code: code }),
        type: 'POST',
        contentType: 'application/json'
      })
    } catch (e) {
      console.log(e)
    }
  }
}

// function lineNumbersFunc(originalLineNumber) {
// 	return "";
// }
