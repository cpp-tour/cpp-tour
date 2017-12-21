import Split from 'split.js'

const PAGE_WIDTH = 960

const makeGutter = () => {
    Split(['#left_pane', '#right_pane'], {
        cursor: 'col-resize',
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
    })
}

export default function resize() {
    const gutter = document.getElementsByClassName('gutter')[0]
    const is_split = gutter !== undefined
    const is_big_screen = window.innerWidth > PAGE_WIDTH

    if (is_big_screen && !is_split) {
        makeGutter()
    } else if (!is_big_screen && is_split) {
        gutter.parentNode.removeChild(gutter)
    }
}
