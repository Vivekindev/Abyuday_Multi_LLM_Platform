const getIST = () =>{
    const date = new Date()
const timeZone = 'Asia/Kolkata';
const format = new Intl.DateTimeFormat('en-US', { timeStyle: 'medium', dateStyle: 'medium', timeZone })
return format.format(date);
}

export default getIST;
