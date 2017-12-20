"use strict"

import UI from './js/UI.js'
import resize from './js/resize.js'

import './styles/main.sss'

window.addEventListener("load", function() {
    const CODE = "#include <iostream>\n\nint main() {\n\tstd::cout << \"Hello, world!\";\n\treturn 0;\n}"
    const ui = new UI()

    /*const code_editor =*/ ui.create_editor(CODE)

    resize()
    window.addEventListener('resize', resize)
})
