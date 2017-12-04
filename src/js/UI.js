"use strict"

import {toggle_class} from './utils.js'

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

    toogle_sidebar() {
        toggle_class(this.dom.sidebar, HIDDEN)
    }
}
