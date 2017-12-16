export function drag() {
    let leftPane = document.getElementById('left_pane')
    let rightPane = document.getElementById('right_pane')
    let separator = document.getElementById('separator')

    separator.style.cursor = 'move'

    let leftLimit = 10
    let rightLimit = 90

    function sdrag(onDrag, onStop, direction) {
        let startX = 0
        let startY = 0
        let el = separator
        let dragging = false

        function dragstart() {
            dragging = true
        }
    
        function dragmove(e) {
            if (dragging) {
                let fix = {}
                    onDrag && onDrag(el, e.pageX, startX, e.pageY, startY, fix)
                    if (direction !== 'vertical') {
                        let pageX = ('pageX' in fix) ? fix.pageX : e.pageX
                        if ('startX' in fix) {
                            startX = fix.startX
                        }
                        if (!('skipX' in fix)) {
                            el.style.left = (pageX - startX) + 'px'
                        }
                    }
                    if (direction !== 'horizontal') {
                        let pageY = ('pageY' in fix) ? fix.pageY : e.pageY
                        if ('startY' in fix) {
                            startY = fix.startY
                        }
                        if (!('skipY' in fix)) {
                            el.style.top = (pageY - startY) + 'px'
                        }
                    }
            }
        }
    
        function dragend() {
            dragging = false
        }

        separator.addEventListener('mousedown', dragstart)
        window.addEventListener('mousemove', function(e) {dragmove(e)})
        window.addEventListener('mouseup', dragend)
        
    }

    sdrag(function (el, pageX, startX, pageY, startY, fix) {
        fix.skipX = true

        if (pageX < window.innerWidth * leftLimit / 100) {
            pageX = window.innerWidth * leftLimit / 100
            fix.pageX = pageX
        }
        if (pageX > window.innerWidth * rightLimit / 100) {
            pageX = window.innerWidth * rightLimit / 100
            fix.pageX = pageX
        }

        let cur = pageX / window.innerWidth * 100
        if (cur < 0) {
            cur = 0
        }
        if (cur > window.innerWidth) {
            cur = window.innerWidth
        }

        let right = (100-cur-2)
        leftPane.style.width = cur + '%'
        rightPane.style.width = right + '%'

    }, null, 'horizontal')

}