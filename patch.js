const fs = require('fs');
const path = require('path');

function patchExtractFiles(baseDir = 'node_modules') {
  const paths = [
    path.join(baseDir, 'extract-files'),
    path.join(baseDir, 'apollo-upload-client', 'node_modules', 'extract-files')
  ];

  paths.forEach(pkgPath => {
    const sourceFile = path.join(__dirname, pkgPath, 'lib', 'extractFiles.js');
    const targetDir = path.join(__dirname, pkgPath, 'public');

    if (fs.existsSync(sourceFile)) {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.copyFileSync(sourceFile, path.join(targetDir, 'extractFiles.js'));
      console.log(`✅ ${pkgPath} успешно пропатчен`);
    }
  });
}

patchExtractFiles();