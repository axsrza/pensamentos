// script.js

document.addEventListener('DOMContentLoaded', function() {
    const thoughtForm = document.getElementById('thoughtForm');
    const nomeInput = document.getElementById('nome');
    const pensamentoInput = document.getElementById('pensamento');
    const pensamentosContainer = document.getElementById('pensamentosContainer');

    thoughtForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = nomeInput.value.trim();
        const pensamento = pensamentoInput.value.trim();

        if (nome !== '' && pensamento !== '') {
            const dataHora = obterDataHoraFormatada();
            exibirPensamento(nome, pensamento, dataHora);

            salvarPensamentoNoFirestore(nome, pensamento, dataHora);

            nomeInput.value = '';
            pensamentoInput.value = '';
        }
    });

    function exibirPensamento(nome, pensamento, dataHora) {
        const divPensamento = document.createElement('div');
        divPensamento.className = 'pensamento';
        divPensamento.innerHTML = `<strong>${nome}</strong>: ${pensamento} <span class="data-hora">(${dataHora})</span>`;

        pensamentosContainer.prepend(divPensamento);
    }

    function obterDataHoraFormatada() {
        const agora = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return agora.toLocaleDateString('pt-BR', options);
    }

    function salvarPensamentoNoFirestore(nome, pensamento, dataHora) {
        db.collection('pensamentos').add({
            nome: nome,
            pensamento: pensamento,
            dataHora: dataHora
        })
        .then(function(docRef) {
            console.log("Pensamento adicionado ao Firestore com ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Erro ao adicionar pensamento ao Firestore: ", error);
        });
    }

    function carregarPensamentosDoFirestore() {
        db.collection('pensamentos').orderBy('dataHora', 'desc').onSnapshot(function(querySnapshot) {
            // Limpar os pensamentos existentes antes de exibir os novos
            pensamentosContainer.innerHTML = '';

            querySnapshot.forEach(function(doc) {
                const { nome, pensamento, dataHora } = doc.data();
                exibirPensamento(nome, pensamento, dataHora);
            });
        });
    }

    // Carregar pensamentos do Firestore ao carregar a página
    carregarPensamentosDoFirestore();
});
