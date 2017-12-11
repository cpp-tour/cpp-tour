import CodeMirror from 'codemirror/lib/codemirror'

import 'codemirror/mode/clike/clike'
import 'codemirror/lib/codemirror.css'

// Override the requireMode and autoLoadMode static methods to noop, this
// disables the "loader" shipped by CodeMirror
CodeMirror.requireMode = function() {}
CodeMirror.autoLoadMode = function() {}

export function create_editor(dom, value) {
    return CodeMirror(dom, {
        value,
        mode: "text/x-c++src",
        lineNumbers: true
    })
}
