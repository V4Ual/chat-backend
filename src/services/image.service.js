var fs = require('fs').promises;
const path = require('path')
exports.createPhoto = async (imageBuffer, fileName) => {
    console.log(path.join(__dirname, `./../../public/${fileName}.png`));
    await fs.writeFile(path.join(__dirname, `./../../public/${fileName}.png`), imageBuffer).then(() => {
        console.log('create successfully');
    }).catch((err) => {
        console.log(err);
    })
}

console.log(path.join(__dirname, `.,/../../../public/`))