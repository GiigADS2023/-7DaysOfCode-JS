// Captura os elementos do formulário
const form = document.querySelector('.js-form');
const nomePessoa = document.getElementById("name");
const dataNascimento = document.getElementById("birth-date");

// Adiciona um único listener para o evento 'submit'
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const birthDateValue = dataNascimento.value; // Data no formato ISO (AAAA-MM-DD)

    if (!birthDateValue) {
        alert('A data de nascimento é obrigatória.');
        return;
    }

    // Converte a data do formato ISO para DD-MM-AAAA
    const [year, month, day] = birthDateValue.split('-');
    const formattedDate = `${day}-${month}-${year}`; // Reorganiza no formato desejado

    // Validação adicional, se necessário
    const dateObject = new Date(year, month - 1, day);
    const today = new Date();
    if (dateObject > today) {
        alert('A data de nascimento não pode ser no futuro.');
        return;
    }

    // Cria o objeto pessoa com a data no formato DD-MM-AAAA
    const pessoa = {
        name: nomePessoa.value,
        birthDate: formattedDate
    };

    console.log(pessoa); // Exibe o objeto no console com a data formatada
});