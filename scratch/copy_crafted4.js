const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'uploads', 'HeaderImage', 'header3.jpeg');
const dest = path.join(__dirname, '..', 'public', 'Crafted', 'Crafted4.jpeg');

fs.copyFileSync(src, dest);
console.log('Successfully copied unique image to Crafted4.jpeg!');
