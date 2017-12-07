"use strict"

import {toggle_class} from './utils.js'
import {create_editor} from './editor.js'

const HIDDEN = 'hidden'

export default class UI {
    constructor() {
        this.dom = {
            main: document.getElementById('main'),
            header: document.getElementById('header'),
            sidebar: document.getElementById('sidebar'),
            editor: document.getElementById('editor')
        }

        this.dom.sidebar_toogle = this.dom.header.children[0]

        //Adjust position of sidebar to be under header
        this.dom.sidebar.style.top = `${this.dom.header.clientHeight}px`

        this.dom.main.addEventListener('click', () => {
            if (!this.dom.sidebar.classList.contains(HIDDEN)) {
                this.toogle_sidebar()
            }
        })

        this.dom.sidebar_toogle.addEventListener('click', () => {
            this.toogle_sidebar()
        })
    }

    /**
     * Creates new instance of editor using provided code as content
     *
     * @param {String} value Initial content of editor.
     *
     * @returns {Object} Instance of editor.
     */
    create_editor(value) {
        return create_editor(this.dom.editor, value)
    }

    /**
     * Toggles sidebar visibility.
     * @returns {void}
     */
    toogle_sidebar() {
        toggle_class(this.dom.sidebar, HIDDEN)
    }
}
