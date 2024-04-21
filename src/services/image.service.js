var fs = require('fs').promises;
const path = require('path')
exports.createPhoto = async (imageBuffer, fileName) => {
    await fs.writeFile(path.join(__dirname, `./../../public/${fileName}.png`), imageBuffer).then(() => {
        console.log('create successfully');
    }).catch((err) => {
        console.log(err);
    })
}

exports.deletePhoto = async (fileName) => {
    await fs.unlink(path.join(__dirname, `./../../public/${fileName}
    `)).then(() => {
        console.log('delete successfully');
    }).catch((err) => {
        console.log(err);
    })
}

