const selectHeroes = document.querySelector(".comics");
const heroesList = document.querySelector('tbody');
const addHeroBtn = document.querySelector('.addHero');
addHeroBtn.addEventListener("click", (event) => {
    event.preventDefault();
    postHeroesToData();
})

async function getUniversesData() {
  const response = await fetch("https://657c478c853beeefdb99140b.mockapi.io/api/heroes/universes");
  const data = await response.json();

  selectHeroes.innerHTML = '';

  data.forEach(element => {
    const option = document.createElement('option');
    option.innerHTML = element.name;
    selectHeroes.appendChild(option);
  })
}

async function getHeroesData() {
    const response = await fetch("https://657c478c853beeefdb99140b.mockapi.io/api/heroes/heroes");
    const data = await response.json();

    heroesList.innerHTML = '';

    data.forEach(element => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${element.name}</td>
                        <td>${element.comics}</td>
                        <td>
                            <label class="heroFavouriteInput">
                                Favourite: <input class="favourite" type="checkbox">
                            </label>
                        </td>
                        <td><button onclick="deleteHeroesFromData(event)" class=deleteBtn id=${element.id}>Delete</button></td>`;

        const input = tr.querySelector('input');
        input.checked = element.favourite === true;

        input.addEventListener("change", () => {
            putFavouriteInfo(element.id, input.checked);
        })

        heroesList.appendChild(tr);
    })
}

async function deleteHeroesFromData(event) {
    const buttondDeleteElement = event.target;
    const id = buttondDeleteElement.getAttribute('id');
    
    const deleteRequest = await fetch("https://657c478c853beeefdb99140b.mockapi.io/api/heroes/heroes/" + id, {
        method: "DELETE",
    }) 

    getHeroesData();
}

async function postHeroesToData() {
    const nameInput = document.querySelector(".name");
    const favoutireCheckBox = document.querySelector('.heroes__form .favourite');

    const nameInputValue = nameInput.value;
    const favoutireCheckBoxValue = favoutireCheckBox.checked;
    
    const postRequest = await fetch("https://657c478c853beeefdb99140b.mockapi.io/api/heroes/heroes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify({
                name: nameInputValue,
                comics: selectHeroes.value,
                favourite: favoutireCheckBoxValue,
            
        })
    })

    getHeroesData();

}

async function putFavouriteInfo(id, checkboxValue) {
    const putRequest = await fetch("https://657c478c853beeefdb99140b.mockapi.io/api/heroes/heroes/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            favourite: checkboxValue,
    })
    })
}



getUniversesData();
getHeroesData();