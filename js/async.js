const api = 'http://localhost:4000/data'
import getData from "./sync.js"

async function get() {
    try {
        let { data } = await axios.get(api)
        getData(data)
    } catch (error) {
        console.log(error);
    }
}
async function deleteUSer(id) {
    try {
        await axios.delete(`${api}/${id}`)
        get()
    } catch (error) {
        console.log(error);
    }
}
async function addUser(user) {
    try {
        await axios.post(api, user)
        get()
    } catch (error) {
        console.log(error);
    }
}
async function editUser(idx, user) {
    try {
        await axios.put(`${api}/${idx}`, user)
        get()
    } catch (error) {
        console.log(error);
    }
}
async function checkUser(e) {
    let status2 = !e.status
    let user = {
        ...e,
        status: status2
    }
    try {
        await axios.put(`${api}/${e.id}`, user)
        get()
    } catch (error) {
        console.log(error);
    }
}
async function getById(e) {
    try {
        let { data } = await axios.get(`${api}/${e.id}`)
        let infoImg = document.querySelector('.infoImg')
        let infoName = document.querySelector('.infoName')
        let infoEmail = document.querySelector('.infoEmail')
        let infoCity =document.querySelector('.infoCity')
        let infoStatus =document.querySelector('.infoStatus')
        infoImg.src = data.avatar;
        infoName.innerHTML = data.name;
        infoStatus.innerHTML = data.status?"Active":"Inactive";
        infoEmail.innerHTML = data.email;
        infoCity.innerHTML =data.city;
        
    } catch (error) {
        console.log(error);
    }
}
async function filterUSers(value) {
    try {
        if (value == 'Active') {
            let { data } = await axios.get(`${api}?status=${true}`)
            getData(data);
        }
        else if (value == 'Inactive') {
            let { data } = await axios.get(`${api}?status=${false}`)
            getData(data);
        }
        else if (value == 'All') {
            get();
        }
    } catch (error) {
        console.log(error);
    }
}
async function filterCity(value) {
    try {
        if (value == 'Dushanbe') {
            let { data } = await axios.get(`${api}?city=${"Dushanbe"}`)
            getData(data);
        }
        else if (value == 'Bokhtar') {
            let { data } = await axios.get(`${api}?city=${"Bokhtar"}`)
            getData(data);
        }
        else if (value == 'Kulob') {
            let { data } = await axios.get(`${api}?city=${"Kulob"}`)
            getData(data);
        }
        else if (value == 'All') {
            get();
        }
    } catch (error) {
        console.log(error);
    }
}
async function searchUser(search) {
    try {
            let { data } = await axios.get(`${api}?name=${search}`)
            getData(data);
    } catch (error) {
        console.log(error);
    }
}

export {searchUser}
export {filterCity}
export { filterUSers }
export { getById }
export { checkUser }
export { editUser }
export { addUser }
export { deleteUSer }
export default get