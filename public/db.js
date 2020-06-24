var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

let db;
// create a new db request for a "budget" database.
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
    // create object store called "pending" and set autoIncrement to true
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true });

};

request.onsuccess = function (event) {
    db = event.target.result;
    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function (event) {
    // log error here
};

function saveRecord(record) {
    // create a transaction on the pending db with readwrite access
    // access your pending object store
    // add record to your store with add method.
    const transaction = db.transaction(["pending"], "readwrite");
    const budgetStore = transaction.objectStore("pending");
    budgetStore.add(record);

}

function checkDatabase() {
    // open a transaction on your pending db
    // access your pending object store
    // get all records from store and set to a variable
    const transaction = db.transaction(["pending"], "readwrite");
    const budgetStore = transaction.objectStore("pending");
    const allRecords = budgetStore.getAll();

    allRecords.onsuccess = function () {
        if (allRecords.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(allRecords.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(() => {
                    // if successful, open a transaction on your pending db
                    // access your pending object store
                    // clear all items in your store
                    const transaction = db.transaction(["pending"], "readwrite");
                    const budgetStore = transaction.objectStore("pending");
                    budgetStore.clear();
                });
        }
    };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);