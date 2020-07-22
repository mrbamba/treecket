export default {
    makeId,
    srcType
}

function makeId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

function srcType(src) {
    if (src.includes('jpg') || src.includes('png')
        || src.includes('gif') || src.includes('scg')) return 'img'
    else if (src.includes('embed') || src.includes('watch')) return 'video'
}