import data from './data.json' assert { type: 'json' };

let items = data.map(item => ({...item, "quantity": 0}))

export default items