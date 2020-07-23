export default {
    makeId,
    srcType,
    getYoutubeId,
    getIframeSrc
}

function makeId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

function srcType(src) {
    if (src.includes('jpg') || src.includes('png')
        || src.includes('gif') || src.includes('scg')) return 'img'
    else if (src.includes('embed') || src.includes('watch') || src.includes('mp4')) return 'video'
    else return 'link'
}

function getYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}
function getIframeSrc(src) {
    const videoId = this.getYoutubeId(src);
    return `https://www.youtube.com/embed/${videoId}`
}