"use strict"

import {compile} from './compiler.js'
import {toggle_class} from './utils.js'
import {create_editor} from './editor.js'

import Split from 'split.js'
import ansi_up from "ansi_up"

const ANSI = new ansi_up()
ANSI.use_classes = true

const ACTIVE = 'active'
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
            exitcode: document.getElementById('exitcode'),
            errmsg: document.getElementById('errmsg'),
            warnings: document.getElementById('warnings'),
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

        this.dom.sidebar.addEventListener('click', (event) => {
            const target = event.target

            if (target.href) {
                for (let link of target.parentNode.children) {
                    link.classList.remove(ACTIVE)
                }

                target.classList.add(ACTIVE)
            }
        })

        for (let link of this.dom.sidebar.children) {
            const hash = link.href.split("#")[1]

            if (hash === location.hash.slice(1)) {
                link.classList.add(ACTIVE)
                break
            }
        }

        this.dom.sidebar_toogle.addEventListener('click', () => this.toogle_sidebar())

        this.actions.run.addEventListener('click', () => this.run())
    }

    /**
     * Creates new instance of editor using provided code as content
     *
     * @param {String} value Initial content of editor.
     *
     * @returns {Object} Instance of editor.
     */
    create_editor(value) {
        while (this.dom.editor.lastChild)
            this.dom.editor.removeChild(this.dom.editor.lastChild)

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
            this.remove_old_output()
            this.actions.run.disabled = true
            this.actions.run.innerText = "Working..."
        } else {
            this.actions.run.disabled = false
            this.actions.run.innerText = "Run"
        }
    }

    remove_old_output() {
        while (this.dom.output.lastChild)
            this.dom.output.removeChild(this.dom.output.lastChild)
        while (this.dom.exitcode.lastChild)
            this.dom.exitcode.removeChild(this.dom.exitcode.lastChild)
        while (this.dom.errmsg.lastChild)
            this.dom.errmsg.removeChild(this.dom.errmsg.lastChild)
        while (this.dom.warnings.lastChild)
            this.dom.warnings.removeChild(this.dom.warnings.lastChild)
    }

    /**
     * Adds output to DOM.
     * @param {String} code Exit code of program.
     * @param {String} output Console output of program.
     * @param {String} compiler_output Console output of the compiler.
     * @returns {void}
     */
    output(code, output, compiler_output) {
        const content = document.createTextNode(`${output}`)
        const exitcode = document.createTextNode(`Program exited with code ${code}.`)
        if (compiler_output) {
            const compiler_output_html_str = ANSI.ansi_to_html(compiler_output)
            this.dom.warnings.innerHTML = compiler_output_html_str
        }

        this.dom.output.appendChild(content)
        this.dom.exitcode.appendChild(exitcode)
        this.toogle_run()
    }

    error(message) {
        const html_str = ANSI.ansi_to_html(message)

        this.dom.errmsg.innerHTML = html_str
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

        compile({code})
            .then((response) => {
                if (response.program_output)
                    this.output(
                        response.status,
                        response.program_output,
                        response.compiler_message)
                else
                    this.error(response.compiler_error)
            })
            .catch((error) => this.output('255', error))
    }
}

Split(['#left_pane', '#right_pane'], {
    gutterSize: 8,
    cursor: 'col-resize'
  })
