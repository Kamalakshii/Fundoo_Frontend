getNotes(req, res) {
try {
let data = {
'userId': req.userinfo.id
}

const query = 'searchNotes' + data.userId; // (req.query.query).trim();

return client.get(`notesRedis:${query}`, (err, result) => {
// If that key exist in Redis store
if (result) {
const resultJSON = JSON.parse(result);
return res.status(200).json(resultJSON);
} else { // Key does not exist in Redis store
// Fetch directly from notesRedis API

service.getNotes(data, (resultJSON, error) => {
if (resultJSON) {

// Save the notesRedis API response in Redis store
client.set(`notesRedis:${query}`, JSON.stringify({ source: 'Redis Cache', resultJSON, }));
// Send JSON response to client
// return res.status(200).json({ source: 'notesRedis API', ...responseJSON, });

res.status(200).send({
source: 'notesRedis API',
message: 'Here you go, all your notes!',
result: resultJSON
})
} else {
// sending the status code to the response along with our object
res.status(500).send({
message: 'unable to get notes, it may be invalid user id',
result: error
});
}
})

// return axios.get(searchUrl)
// .then(response => {
// const responseJSON = response.data;
// // Save the notesRedis API response in Redis store
// client.setex(`notesRedis:${query}`, 3600, JSON.stringify({ source: 'Redis Cache', ...responseJSON, }));
// // Send JSON response to client
// return res.status(200).json({ source: 'notesRedis API', ...responseJSON, });
// })
// .catch(err => {
// return res.json(err);
// });
}
});

// service.getNotes(data, (result, error) => {
// if (result) {
// res.status(200).send({
// message: 'Here you go, all your notes!',
// result: result
// })
// } else {
// // sending the status code to the response along with our object
// res.status(500).send({
// message: 'unable to get notes, it may be invalid user id',
// result: error
// });
// }
// })

} catch (err) {
console.error(err);
res.send(err);
}
},