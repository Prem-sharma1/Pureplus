const fs = require('fs');
const path = require('path');

const fileToDelete = path.join(__dirname, '..', 'app', 'admin', 'route.ts');
if (fs.existsSync(fileToDelete)) {
  fs.unlinkSync(fileToDelete);
  console.log('Successfully deleted:', fileToDelete);
} else {
  console.log('File does not exist:', fileToDelete);
}
