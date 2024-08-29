import data from './data.json' assert { type: 'json' };

let id = 1

let items = data.map(item => ({...item, id: id++,"quantity": 0}))

export default items