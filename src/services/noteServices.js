/*******************************************************************************
 *  @Purpose        : To create note services that will perform CRUD operations.
 *  @file           : noteServices.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 29-03-2019
 *******************************************************************************/
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
/**
 * 
 * @param {*} data 
 */
export function updateTrashStatus(data) {
    console.log("trash data from front-end==>", data);
    var headers = {
        "token": localStorage.getItem("token")
    }
    return axios.put('/isTrashed',
        data, {
            headers: headers
        }
    )
}
/**
 * 
 * @param {*} data 
 */
export function setReminder(data) {
    console.log("reminder data from front-end==>", data);
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
 * @param {*} data 
 */
export function isTrashed(data) {
//console.log("in trashhhhhhhhhhhhhhh",data);
    return axios.put('/isTrash', data, {
        headers: { 'token': localStorage.getItem('token') }

    })
}
/**
 * 
 * @param {*} data 
 */
export function updateTitle(data) {
    var headers = {
        "token": localStorage.getItem("token")
    }
    return axios.put('/editTitle',
        data, {
            headers: headers
        }
    )
}
/**
 * 
 * @param {*} data 
 */
export function updateDescription(data) {
    var headers = {
        "token": localStorage.getItem("token")
    }
    return axios.put('/editDescription',
        data, {
            headers: headers
        }
    )
}
/**
 * 
 * @param {*} data 
 */
export function updatePin(data) {
    console.log("pinned data from front-end==>", data);
    var headers = {
        "token": localStorage.getItem("token")
    }
    return axios.put('/isPinned',
        data, {
            headers: headers
        }
    )
}
/**
* @description:
* @param {*} url 
* @param {*} data 
*/
export function deleteNoteForever(data) {
    console.log("delete note data from front-end==>", data);
    var headers = {
        'Content-Type': 'application/json',
        "token": localStorage.getItem("token")
    }
    return axios.post('/deleteNote',
        data, {
            headers: headers
        }
    )
}
/**
 * 
 * @param {*} data 
 */
export function notification(data){
    console.log("front to back data,,,,,,",data);   
    var headers = {
        "Content-Type" : "application/json",
        "token" : localStorage.getItem("token")
    }
    return axios.post("/notification",
    data,{
        headers:headers
    }
    )
}
/**
 * 
 * @param {*} data 
 */

export function addLabel(data){
    console.log("front to back data,,,,,,",data);   
    var headers = {
        "Content-Type" : "application/json",
        "token" : localStorage.getItem("token")
    }
    return axios.post("/addLabel",
    data,{
        headers:headers
    }
    )
}
export function getLabels() {
    // console.log("*----get labels from front-end----*");
    return axios.get('/getLabels', {
        headers: {
            "token": localStorage.getItem("token")
        }
    })
}  
/**
 * 
 * @param {*} data 
 */
export function deleteLabel(data) {
    return axios('/deleteLabel', {
        method: "POST",
        headers: {
            "token": localStorage.getItem("token")
        },
        data:data
    })
}
export function updateLabel(data) {
    return axios('/updateLabel', {
        method: "PUT",
        headers: {
            "token": localStorage.getItem("token")
        },
        data:data
    })
}
/**
 * 
 * @param {*} url 
 * @param {*} data 
 */
export function saveLabel(url,data) {
    return axios(url, {
        method: "POST",
        headers: {
            "token": localStorage.getItem("token")
        },
        data:data
    })
}
/****************************************************************************************************/
/**
 * 
 * @param {*} notesData 
 * 
 */
export function otherArray(notesData) {
    let otherArr = [];
    notesData.forEach(function (index) {
        if (!index.archive && !index.trash) {
            otherArr.push(index);
        }
    })
    return otherArr;
}
/**
 * @param {*} notesData 
 */

export function archiveArray(notesData) {
    let archiveArr = [];
    notesData.forEach(function (index) {
        if(index.archive) {
            archiveArr.push(index);
        }
    })
    return archiveArr;
}
/**
 * 
 * @param {*} notesData 
 */
export function reminderArray(notesData) {
    let reminderArr = [];
    notesData.forEach(function (index) {
        if (index.reminder !== "" && !index.trash) {
            reminderArr.push(index);
        }
    })
    return reminderArr;
}
/**
 * 
 * @param{*}notesData
 */
export function trashArray(notesData) {
    let trashArr = [];
    notesData.forEach(function (index) {
        if (index.trash) {
            trashArr.push(index);
        }
    })
    return trashArr;
}
/**
 * 
 * @param{*}notesData
 */
export function pinArray(notesData) {
    let pinArr = [];
    notesData.forEach(function (index) {
        if (index.pin) {
            pinArr.push(index);
        }
    })
    return pinArr;
}
