"use strict"

const fs = require('fs')
const path = require('path')

const LESSON_DIR = path.normalize(path.join(__dirname, '..', 'lessons'))

/**
 * Retrieves list of lessons.
 *
 * @return {Array} Sorted list of lessons.
 */
function get_lessons() {
    function format_dirs(dir_list) {
        const result = []

        for (let dir of dir_list) {
            const full_path = path.join(LESSON_DIR, dir)

            if (!fs.lstatSync(full_path).isDirectory()) {
                continue
            }

            const name = path.basename(dir)

            if (name === 'default') {
                continue
            }

            //format: num-chapter_part1-chapter_part2
            let [num_str, ...chapter] = name.split('-')
            const num = parseFloat(num_str)
            chapter = chapter.join(' ')

            result.push({
                num,
                num_str,
                name: chapter,
                dir_name: name
            })
        }

        //Ensure ascending order by chapter number.
        result.sort((left, right) => left.num - right.num)

        return result
    }

    const dir_list = format_dirs(fs.readdirSync(LESSON_DIR))

    return dir_list
}

module.exports = get_lessons
