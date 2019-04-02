import axios from 'axios';
/**
 * @description:To create a new note
 * @param {*used to send data or note to server} data 
 */
export function createNote(data) {
    console.log("create note data from front-end==>", data);
    var headers = {
        'Content-Type': 'application/json',
        'token': localStorage.getItem("token")
    }
    return axios.post('/createNote',
        data, {
            headers: headers
        }
    )
}
/**
 * @description:To get the created notes
 */
export function getNotes() {
    console.log("*----get notes from front-end----*");
    return axios.get('/getNotes', {
        headers: {
            "token": localStorage.getItem("token")
        }
    })
}
/**
 * @description:
 * @param {*} url 
 * @param {*} data 
 */
export function updateColor(data) {
    //console.log("color data from front-end==>", data);
    var headers = {
        'Content-Type': 'application/json',
        "token": localStorage.getItem("token")
    }
    return axios.put('/updateColor',
        data, {
            headers: headers
        }
    )
}
/**
 * 
 * @param {*} notesData 
 */
export function otherArray(notesData) {
    let otherArr = [];
    for (let i = 0; i < notesData.length; i++) {
        if (!notesData[i].archive) {
            otherArr.push(notesData[i]);
        }
    }
    return otherArr;
}
/**
 * 
 * @param {*} data 
 */
export function setReminder(data) {
    //console.log("reminder data from front-end==>", data);
    var headers = {
        "token": localStorage.getItem("token")
    }
    return axios.put('/reminder',
        data, {
            headers: headers
        }
    )
}
/**
 * 
 * @param {*} notesData 
 */
export function remiderArray(notesData) {
    let reminderArr = [];
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].reminder !== "" && !notesData[i].trash) {
            reminderArr.push(notesData[i]);
        }
    }
    return reminderArr;
}
/**
 * 
 * @param {*} data 
 */
export function updateArchiveStatus(data) {
    console.log("archive data from front-end==>", data);
    var headers = {
        "token": localStorage.getItem("token")
    }
    return axios.put('/isArchived',
        data, {
            headers: headers
        }
    )
}