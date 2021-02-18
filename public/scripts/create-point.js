function populateUFs() {
    const ufSelect = document.querySelector("select[name=state]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => {
            return res.json()
        })
        .then((states) => {

            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.sigla}">${state.nome}</option>`
            }

        });
}
populateUFs();

function selectCity(event) {
    const citySelect = document.querySelector("select[name=city]");
    const ufInput = document.querySelector("input[name=uf]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    ufInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    fetch(url)
    .then((res) => {
        return res.json()
    })
    .then((cities) => {
        citySelect.innerHTML = "";

        for (city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    });
};

document.querySelector("select[name=state]")
.addEventListener("change", selectCity);

const itemsToCollect = document.querySelectorAll(".cards li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
};

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItems.findIndex((item) => {
        const itemFound = item == itemId;
        return itemFound;
    });

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter((item) => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });

        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }

    collectedItems.value = selectedItems;
    console.log(collectedItems)
}