"use strict"

import UI from './js/UI.js'
import resize from './js/resize.js'

import './styles/main.sss'

window.addEventListener("load", function() {
    const ui = new UI()

    function on_hash_change() {
        const code = window.LESSONS[location.hash.slice(1)]
        if (code !== undefined) {
            ui.create_editor(code)
        }
    }

    window.addEventListener('hashchange', on_hash_change)
    window.addEventListener('resize', resize)

    on_hash_change()
    resize()
})
