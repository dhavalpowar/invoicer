const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
.then(createWindowsInstaller)
.catch((error) => {
console.error(error.message || error)
process.exit(1)
});

function getInstallerConfig () {
  console.log('Creating windows installer...')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, `${process.argv[0]}-win32-ia32/`),
    authors: `${process.argv[0]} Inc.`,
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: `${process.argv[0]}.exe`,
    setupExe: `${process.argv[0]}.exe`,
    setupIcon: path.join(rootPath, 'src', 'assets', 'icons', 'icon.ico')
  })
}
