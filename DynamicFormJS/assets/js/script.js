// Captura os elementos do formulário e da tabela
const form = document.querySelector('.js-form');
const nomePessoa = document.getElementById("name");
const dataNascimento = document.getElementById("birth-date");
const tableBody = document.getElementById("table-body");

// Função para salvar no localStorage
function saveToLocalStorage(person) {
    let people = JSON.parse(localStorage.getItem('people')) || [];
    people.push(person);
    localStorage.setItem('people', JSON.stringify(people));
}

// Função para exibir os dados na tabela
function displayPeople() {
    const people = JSON.parse(localStorage.getItem('people')) || [];
    tableBody.innerHTML = ''; // Limpa a tabela antes de preencher
    people.forEach(person => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.name}</td>
            <td>${person.birthDate}</td>
            <td>
                <button class="js-edit" onclick="editPerson(${people.indexOf(person)})">Editar</button>
                <button class="js-delete" onclick="deletePerson(${people.indexOf(person)})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para editar um pessoa
function editPerson(index) {
    const people = JSON.parse(localStorage.getItem('people')) || [];
    const person = people[index];
    const name = prompt('Digite o novo nome', person.name);
    const birthDate = prompt('Digite a nova data de nascimento', person.birthDate);
    person.name = name;
    person.birthDate = birthDate;
    localStorage.setItem('people', JSON.stringify(people));
    displayPeople();
}

// Função para excluir um pessoa    
function deletePerson(index) {
    const people = JSON.parse(localStorage.getItem('people')) || [];
    people.splice(index, 1);
    localStorage.setItem('people', JSON.stringify(people));
    displayPeople();
}

// Adiciona um único listener para o evento 'submit'
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const birthDateValue = dataNascimento.value;

    if (!birthDateValue) {
        alert('A data de nascimento é obrigatória.');
        return;
    }

    // Converte a data do formato ISO para DD-MM-AAAA
    const [year, month, day] = birthDateValue.split('-');
    const formattedDate = `${day}-${month}-${year}`;

    const dateObject = new Date(year, month - 1, day);
    const today = new Date();
    if (dateObject > today) {
        alert('A data de nascimento não pode ser no futuro.');
        return;
    }

    // Cria o objeto pessoa
    const pessoa = {
        name: nomePessoa.value,
        birthDate: formattedDate
    };

    saveToLocalStorage(pessoa); // Salva no localStorage
    displayPeople(); // Atualiza a tabela
    form.reset(); // Limpa o formulário
});

// Exibe os dados ao carregar a página
window.addEventListener('DOMContentLoaded', displayPeople);