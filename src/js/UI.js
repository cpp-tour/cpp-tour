"use strict"

import {compile} from './compiler.js'
import {toggle_class} from './utils.js'
import {create_editor} from './editor.js'

const HIDDEN = 'hidden'
const RUNNING = 'running'

export default class UI {
    constructor() {
        this.dom = {
            main: document.getElementById('main'),
            header: document.getElementById('header'),
            sidebar: document.getElementById('sidebar'),
            editor: document.getElementById('editor'),
            output: document.getElementById('output'),
        }
        this.actions = {
            run: document.getElementById('run'),
            reset: document.getElementById('reset'),
        }

        this.dom.sidebar_toogle = this.dom.header.children[0]

        //Adjust position of sidebar to be under header
        this.dom.sidebar.style.top = `${this.dom.header.clientHeight}px`

        //Event handlers
        this.dom.main.addEventListener('click', () => {
            if (!this.dom.sidebar.classList.contains(HIDDEN)) {
                this.toogle_sidebar()
            }
        })

        this.dom.sidebar_toogle.addEventListener('click', () => this.toogle_sidebar())

        this._run = () => this.run()
        this.actions.run.addEventListener('click', this._run)
    }

    /**
     * Creates new instance of editor using provided code as content
     *
     * @param {String} value Initial content of editor.
     *
     * @returns {Object} Instance of editor.
     */
    create_editor(value) {
        this.actions.reset.removeEventListener('click', this.editor_reset)
        this.editor_reset = () => this.editor.getDoc().setValue(value)

        this.editor = create_editor(this.dom.editor, value)

        this.actions.reset.addEventListener('click', this.editor_reset)

        return this.editor
    }

    /**
     * Toggles sidebar visibility.
     * @returns {void}
     */
    toogle_sidebar() {
        toggle_class(this.dom.sidebar, HIDDEN)
    }

    /**
     * Toggles Run button.
     * @returns {void}
     */
    toogle_run() {
        if (toggle_class(this.actions.run, RUNNING)) {
            //added
            this.actions.run.disabled = true
            this.actions.run.innerText = "Working..."
        } else {
            this.actions.run.disabled = false
            this.actions.run.innerText = "Run"
        }
    }

    /**
     * Adds output to DOM.
     * @param {String} code Exit code of program.
     * @param {String} output Console output of program.
     * @returns {void}
     */
    output(code, output) {
        const content = output ? document.createTextNode(`${output}\n\nProgram exited with code ${code}`) :
                                 document.createTextNode(`Program exited with code ${code}`)

        while (this.dom.output.lastChild) {
            this.dom.output.removeChild(this.dom.output.lastChild)
        }

        this.dom.output.appendChild(content)
        this.toogle_run()
    }

    /**
     * Executes code in editor and then prints output.
     * @returns {void}
     */
    run() {
        this.toogle_run()
        const code = this.editor.getValue()
        //TODO: There is no API to cancel promies.
        //      Needs to think on strategy to do it.
        compile({code}).then((response) => this.output(response.status, response.program_output))
                       .catch((error) => this.output('255', error))
    }
}
