const FileType = require('file-type')
const fs = require('fs')

const getMimeType = async (path) => {
    const type = await FileType.fromFile(path)
    return type.mime
}

const isImage = async (path) => {
    const mime = await getMimeType(path)
    return mime.startsWith('image')
}

const deleteFile = (path) => {
    try {
        fs.unlinkSync(path)
    } catch {}
}

const deleteFiles = (files) => {
    files.forEach(path => deleteFile(path))
}

module.exports = {
    getMimeType,
    isImage,
    deleteFile,
    deleteFiles
}