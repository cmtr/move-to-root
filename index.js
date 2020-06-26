const fs = require('fs');
const path = require('path');
const fp = require('lodash/fp');

// Root directory path
const rootDir = path.join('/home', 'User', 'Pictures');

// Common
const fileInfoToFilePath = ({ dirPath, fileName }) => path.join(dirPath, fileName);

// Get Directory File Info
const direntToFileInfo = (dirPath) => (dirent) => ({
	dirPath,
	fileName: dirent.name,
	isFile: dirent.isFile(),
	isSymbolicLink: dirent.isSymbolicLink(),
	isDirectory: dirent.isDirectory()
});

const notSymbolicLink = ({ isSymbolicLink }) => !isSymbolicLink;

const readdir = (dirPath) => fs
	.readdirSync(dirPath, {
		encoding: 'utf8',
		withFileTypes: true 
	});

const getDirectoryFileInfo = (dirPath) => {	
	const toFileInfo = direntToFileInfo(dirPath);
	return fp.compose(
		fp.filter(notSymbolicLink),
		fp.map(toFileInfo),
		readdir
	)(dirPath);
}


// Move Files
const fileInfoToNewPath = (rootDir) => (fileInfo) => {
	const { dirPath, fileName } = fileInfo;
	if (rootDir === dirPath)
		return fileInfoToFilePath(fileInfo);
	const sub = dirPath
		.replace(rootDir + '/', '')
		.split(path.sep)
		.join('-');
	return `${rootDir}/${sub}-${fileName}`;
}



const fileInfoToPath = (pathStrategy) => (fileInfo) => ({
	oldPath: fileInfoToFilePath(fileInfo),
	newPath: pathStrategy(fileInfo)
});

const renameFile = async ({ oldPath, newPath }) => (oldPath === newPath) 
	? {} 
	: fs.renameSync(oldPath, newPath);

const moveFiles = (rootDir, directoryFileInfo) => {
	const pathStrategy = fileInfoToNewPath(rootDir)
	const toPath = fileInfoToPath(pathStrategy);
	const moveFile = fp.compose(
		renameFile, 
		toPath
	);
	return fp.compose(
		fp.map(moveFile),
		fp.filter('isFile')
	)(directoryFileInfo); 
}

const moveDirectoriesToRoot = (rootDir, directoryFileInfo) => {
	const moveDirectoryToRoot = fp.compose(
		moveFileToRoot.bind(null, rootDir), 
		fileInfoToFilePath
	);
	return fp.compose(
		fp.map(moveDirectoryToRoot),
		fp.filter('isDirectory')
	)(directoryFileInfo);
}


const moveFileToRoot = async function(rootDir, dir) {
	const dirPath = dir ? dir : rootDir;
	const directoryFileInfo = getDirectoryFileInfo(dirPath);
	// Depth first iteration of the three
	await moveDirectoriesToRoot(rootDir, directoryFileInfo);
	return moveFiles(rootDir, directoryFileInfo);
}

moveFileToRoot(rootDir)
	.then(() => console.log('Move Complete'))
	.catch(console.log);
