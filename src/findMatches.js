// found on stackoverflow https://stackoverflow.com/questions/45501997/splitting-string-into-matching-and-non-matching-groups-in-javascript
// maybe there is a better way to highlight but as it was timeboxed to 2-3h I use this shortcut

export default (rex, str) => {
    const segments = []
    let lastIndex = 0
    let match
    rex.lastIndex = 0 // In case there's a dangling previous search
    while ((match = rex.exec(str))) {
        if (match.index > lastIndex) {
            segments.push(str.substring(lastIndex, match.index))
        }
        segments.push(match[0])
        lastIndex = match.index + match[0].length
    }
    if (lastIndex < str.length) {
        segments.push(str.substring(lastIndex))
    }
    return segments
}
