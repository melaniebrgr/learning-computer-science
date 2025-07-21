const inputElement = document.getElementById("fileUpload");

function handleFiles() {
  const fileList = this.files
  console.log(fileList);
}

inputElement.addEventListener("change", handleFiles, false);

navigator.storage.estimate().then(console.info);

const opfsRoot = await navigator.storage.getDirectory();

console.log(opfsRoot);

(async () => {
  const fileHandle = await opfsRoot
    .getFileHandle('my first file', {create: true});
  
  const existingFileHandle = await opfsRoot.getFileHandle('my first file');

  console.log(fileHandle);
  
  
  // const directoryHandle = await opfsRoot
  //   .getDirectoryHandle('my first folder', {create: true});
  
  // const nestedFileHandle = await directoryHandle
  //   .getFileHandle('my first nested file', {create: true});
  
  // const nestedDirectoryHandle = await directoryHandle
  //   .getDirectoryHandle('my first nested folder', {create: true});
})();
