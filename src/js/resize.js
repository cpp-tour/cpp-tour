import Split from 'split.js'

const PAGE_WIDTH = 960

const isSplited = () => document.getElementsByClassName('gutter').length > 0
const isBigScreen = () => window.innerWidth > PAGE_WIDTH
const main = document.getElementById('main')
const gutter = () => document.getElementsByClassName('gutter')[0]

const makeGutter = () => {Split(['#left_pane', '#right_pane'], {
    gutterSize: 8,
    cursor: 'col-resize'
  })}

export default function resize() {
    if (isBigScreen() && !isSplited()) {
        makeGutter()
    } else if (!isBigScreen() && isSplited()) {
        main.removeChild(gutter())
        location.reload()
    }
}
