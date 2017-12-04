"use strict"

import {create_editor} from './js/editor.js'
import UI from './js/UI.js'

import './styles/main.sss'

window.addEventListener("load", function() {
    const ui = new UI()

    /*const code_editor =*/ create_editor(ui.dom.editor)
})
