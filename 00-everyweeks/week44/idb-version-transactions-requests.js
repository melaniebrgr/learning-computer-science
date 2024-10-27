import { v4 as uuid } from 'https://jspm.dev/uuid';

const version = 1;

(function initDB() {
  let db;
  let objectStore;
  const NotesIDBOpenRequest = indexedDB.open('NotesDB', version);

  NotesIDBOpenRequest.addEventListener('error', (error) => {
    console.error(error);
  });

  NotesIDBOpenRequest.addEventListener('success', (event) => {
    db = event.target.result;
    console.log(">> success", db);
  });

  NotesIDBOpenRequest.addEventListener('upgradeneeded', (event) => {
    db = event.target.result;
    console.info(`>> upgradeneeded: DB updated from ${event.oldVersion} to ${event.newVersion}`, db)

    if (!db.objectStoreNames.contains('notesStore')) {
      objectStore = db.createObjectStore('notesStore', {
        keyPath: 'id',
      })
    }
  });

  NotesIDBOpenRequest.addEventListener('blocked', (event) => {
    console.log(">> blocked");
  })
})();

(function initApp() {
  const fileInputElement = document.getElementById("fileUpload");
  fileInputElement.addEventListener("change", handleFileChange, false);
  function handleFileChange() {
    const fileList = this.files
    console.info(fileList);
  }
})();
