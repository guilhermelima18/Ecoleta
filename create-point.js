document.querySelector("select[name=state]")
.addEventListener("change", selectCity);

function populateUFs() {
    const ufSelect = document.querySelector("select[name=state]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => {
            return res.json()
        })
        .then((states) => {

            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
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
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    });
};