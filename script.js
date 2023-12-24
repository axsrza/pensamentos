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
});
