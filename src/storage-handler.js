export default class StorageHandler {
    constructor() {

    }

    // 
    // Static Properties
    // 

    static #localStorageAvailable = false;

    static #checkStorageAvailability(value) { // detect local storage feature (https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage)
        let storage;
        try {
            storage = window[value];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0
            );
        }
    }

    static #verifyLocalStorageFunctionality() {
        localStorage.test = "If you're seeing this, local storage is working!";
        console.log(localStorage.test);
        localStorage.removeItem("test");
        console.log("test JSON removed");
    }

    static #initilize() {
        if (StorageHandler.#checkStorageAvailability("localStorage")) {
            console.info("✅ Local storage is available and functional.");
            StorageHandler.#verifyLocalStorageFunctionality();
            StorageHandler.#localStorageAvailable = true;
        } else {
            console.warn("⚠️ Local storage is not functional. This could be due to browser settings, storage limits being exceeded, or other restrictions.");
        }
    }

    static {
        StorageHandler.#initilize();
    }

    static get localStorageAvailable() {
        return StorageHandler.#localStorageAvailable;
    }

    // 
    // Instance Properties
    // 

    get localStorageAvailable() {
        return StorageHandler.#localStorageAvailable;
    }
}

// What does a single task object look like?
const tasks = {
    ["currentDateTime" + "name"]: {
        title: "",
        description: "",
        dueDate: null,
        priority: 0,
        notes: "",
        projects: [],
        subtasks: {
            // nested tasks? nah, keep it to one layer deep. this should become a class or something
        },
        completed: false,
    }
}