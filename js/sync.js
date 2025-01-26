let box = document.querySelector('.box')
let tbody = document.querySelector('.tbody')
let btnModal = document.querySelector('.btnModal')
let divBtn1 = document.querySelector('.divBtn1')
let addModal = document.querySelector('.addModal')
let addForm = document.querySelector('.addForm')
let addBtn = document.querySelector('.btnAdd')
let editModal = document.querySelector('.editModal')
let editForm = document.querySelector('.editForm')
let infoModal = document.querySelector('.infoModal')
let searchForm = document.querySelector('.searchForm')
let filter = document.querySelector('.filter')
filter.innerHTML = '<option value="All">All</option><option value="Active">Active</option><option value="Inactive">Inactive</option>';
let filterCty = document.querySelector('.filterCity')
filterCty.innerHTML = '<option value="All">All</option><option value="Dushanbe">Dushanbe</option><option value="Bokhtar">Bokhtar</option><option value="Kulob">Kulob</option>';
let idx = null


import { deleteUSer } from "./async.js";
import { addUser } from "./async.js";
import { editUser } from "./async.js";
import { checkUser } from "./async.js"
import { getById } from "./async.js"
import { searchUser } from "./async.js"
import { filterUSers } from "./async.js"
import { filterCity } from "./async.js"


function getData(data) {
    tbody.innerHTML = ''
    data.forEach((e) => {
        let tr = document.createElement('tr')
        let btnClose = document.querySelector('.btnClose2')
        //name        
        let trName = document.createElement('div')
        let tdName = document.createElement('td');
        let divImg = document.createElement('div');
        let divName = document.createElement('div');
        let profImg = document.createElement('img');
        profImg.src = e.avatar;
        let pName = document.createElement('p')
        let pEmail = document.createElement('p')
        pName.innerHTML = e.name;
        pEmail.innerHTML = e.email;
        divImg.append(profImg);
        divName.append(pName, pEmail)
        //city
        let tdCity = document.createElement('td');
        let pCity = document.createElement('p');
        pCity.innerHTML = e.city;
        //status
        let tdStat = document.createElement('td');
        let pStat = document.createElement('p');
        pStat.innerHTML = e.status?"Active":"Inactive";
        //phone
        let tdPhone = document.createElement('td');
        let pPhone = document.createElement('p');
        pPhone.innerHTML = e.phone;
        //action
        let tdAction = document.createElement('td')
        let btnImage = document.createElement('img');
        btnImage.src = '/images/1.png'
        btnImage.onclick = () => {
            btnModal.showModal();
            divBtn1.innerHTML = "";
            divBtn1.append(btnDelete, btnEdit, btnCheck, btnInfo, btnClose);
            btnClose.onclick = () => {
                btnModal.close();
            }
        };
        let btnDelete = document.createElement('button')
        btnDelete.innerHTML = 'Delete';
        btnDelete.onclick = () => {
            deleteUSer(e.id)
        }
        let btnEdit = document.createElement('button')
        btnEdit.innerHTML = 'Edit';
        btnEdit.onclick = () => {
            editModal.showModal();
            editForm['editName'].value = e.name;
            editForm['editEmail'].value = e.email;
            editForm['editImage'].value = e.avatar;
            editForm['editPhone'].value = e.phone;
            idx = e.id
            editForm.onsubmit = (e) => {
                e.preventDefault()
                let stat = document.querySelector('.Status')
                let city2 = document.querySelector('.City')
                let newUser = {
                    name: editForm['editName'].value,
                    email: editForm['editEmail'].value,
                    avatar: editForm['editImage'].value,
                    phone: editForm['editPhone'].value,
                    status: stat.value,
                    city: city2.value
                }
                editUser(idx, newUser)
            }
            btnClose.onclick = () => {
                editModal.close();
            }

        }
        let btnCheck = document.createElement('button')
        btnCheck.innerHTML = 'Check';
        btnCheck.onclick = () => {
            checkUser(e)
        }
        let btnClose2 = document.querySelector('.btnClose')
        let btns = document.querySelector('.btns')
        let btnInfo = document.createElement('button')
        btnInfo.innerHTML = 'Info';
        btnInfo.onclick = () => {
            infoModal.showModal();
            getById(e);
            btnClose2.onclick = () => {
                infoModal.close();
            };
            btns.append(btnClose2)
        };
        
       
        tdPhone.append(pPhone)
        tdStat.append(pStat)
        tdCity.append(pCity)
        trName.append(divImg, divName)
        tdName.append(trName)
        tdAction.append(btnImage)
        tr.append(tdName, tdCity, tdStat, tdPhone, tdAction)
        tbody.append(tr)
    });
}
let btnLight = document.querySelector('.btnLight')
let btnDark = document.querySelector('.btnDark')
let body = document.body

btnLight.onclick = () => {
    body.classList.remove('dark')
}

btnDark.onclick = () => {
    body.classList.add('dark')
}
addBtn.onclick = () => {
    addModal.showModal();
    addForm.onsubmit = (e) => {
        e.preventDefault();
        let newUser = {
            name: addForm['addName'].value,
            status: false,
        };
        addUser(newUser);
    };
}
filter.onchange = () => {
    let value = filter.value
    filterUSers(value)
}
filterCty.onchange = () => {
    let value = filterCty.value
    filterCity(value)
    console.log(filterCty.value);
}
searchForm.onsubmit = (e) => {
    e.preventDefault()
    let search = searchForm['search'].value;
    searchUser(search)
}


export default getData
