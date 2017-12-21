import Split from 'split.js'

const PAGE_WIDTH = 960

const isSplited = () => document.getElementsByClassName('gutter').length > 0
const isBigScreen = () => window.innerWidth > PAGE_WIDTH
const needGutter = () => isBigScreen() && !isSplited()
const noNeedGutter = () => !isBigScreen() && isSplited()

const main = document.getElementById('main')
const gutter = () => document.getElementsByClassName('gutter')[0]

const makeGutter = () => {Split(['#left_pane', '#right_pane'], {
    elementStyle: function (dimension, size, gutterSize) {
        return {
            'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)'
        }
    },
    gutterStyle: function (dimension, gutterSize) {
        return {
            'flex-basis':  gutterSize + 'px'
        }
    }
})}

export default function resize() {
    if (needGutter()) {
        makeGutter()
    } else if (noNeedGutter()) {
        main.removeChild(gutter())
    }
}
