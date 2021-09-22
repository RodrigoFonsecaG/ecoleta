const ufSelect = document.querySelector('select[name=uf]');
const citySelect = document.querySelector('select[name=city]');
const stateInput = document.querySelector('input[name=state]');

function populateUFs() { 
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((res) => res.json())
    .then((states) => {
      states.forEach((state) => {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        //coloca dentro do html do select cada opcao de estado
      });
    });
} //funcao que faz o fetch na api de estados e coloca todas nas opcoes
// no select por meio das options, tambem salva o id de cada estado no value do option
// para ser usado para futuramente mostrar a cidades daquele estado por meio do id

populateUFs(); //executa a funcao

const populateCities = async (event) => {
  const ufValue = event.target.value; //pega o id do estado que está selecionado

  const indexOfSelectedState = event.target.selectedIndex; 
  stateInput.value = event.target.options[indexOfSelectedState].text;
    //salva o nome do estado em um input escondido para ser usado
  //futuramente

  citySelect.innerHTML = "<option value>Selecione a cidade</option>";
  citySelect.disabled = true;
  // reseta o campo de cidades para quando mudar de estado nao adicionar
  // as cidades do estado anterior e do atual.

  const res = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  ); //faz o fetch recebendo como valor o id do estado selecionado

  const cities = await res.json();

  cities.forEach((city) => {
    citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
  });
  // adiciona no select da cidade por meio do options, cada opcao de cidade
  citySelect.removeAttribute('disabled');
  //remove o atributo disabled do select quando selecionamos um estado
};

ufSelect.addEventListener('change', populateCities);
//quando a mudanca no select dos estados ativa a funcao de mostrar as cidades



// ITEMS DE COLETA

const itemsToCollect = document.querySelectorAll(".items-grid li");
const collectedItems = document.querySelector("input[name=items]");

itemsToCollect.forEach((item) => {
  item.addEventListener('click', handleSelectedItem)
})


let selectedItems = [];

function handleSelectedItem(event){
  const itemId = event.currentTarget.dataset.id;
  const itemLi = event.currentTarget


  itemLi.classList.toggle('selected');

  const alreadySelected =  selectedItems.findIndex(item => itemFound = item == itemId)

  if(alreadySelected >= 0){

    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })
    selectedItems = filteredItems;
  }else{
    selectedItems.push(itemId);
  }

  //atualizar o campo escondido com os itens selecionados
  collectedItems.value = selectedItems;

}


