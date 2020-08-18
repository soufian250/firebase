const cafeList = document.querySelector('#cafe-list')
const form = document.querySelector('#add-cafe-form')

function renderCafe(cafe) {

    
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cros = document.createElement('div');

    li.setAttribute('data-id', cafe.id);
    name.textContent= cafe.data().name;
    city.textContent= cafe.data().city;
    cros.textContent= 'X';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cros);

    cafeList.appendChild(li);

    // delete data
    cros.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })


}

//getting data
// methode 1:
// db.collection('cafes').orderBy('name').get().then((snapshot) =>{
//     snapshot.docs.forEach(cafe  => {
//         renderCafe(cafe)
//     });
// })

// Methode 2 -Real Time-:
db.collection('cafes').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges()
    changes.forEach(change =>{
        if (change.type == 'added') {
            renderCafe(change.doc);

        }else if(change.type == 'removed'){
            
            let li = cafeList.querySelector('[data-id = '+change.doc.id +']');
            cafeList.removeChild(li);
        }
    })
})



//Add data
form.addEventListener('submit',(e) =>{
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });
    form.name.value ="";
    form.city.value ="";
})