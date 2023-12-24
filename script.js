document.addEventListener('DOMContentLoaded', function() {
    const thoughtForm = document.getElementById('thoughtForm');
    const pensamentoInput = document.getElementById('pensamento');
    const pensamentosContainer = document.getElementById('pensamentosContainer');

    thoughtForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const novoPensamento = pensamentoInput.value;
        if (novoPensamento.trim() !== '') {
            exibirPensamento(novoPensamento);
            pensamentoInput.value = '';
        }
    });

    function exibirPensamento(pensamento) {
        const divPensamento = document.createElement('div');
        divPensamento.className = 'pensamento';
        divPensamento.textContent = pensamento;

        pensamentosContainer.prepend(divPensamento);
    }
});
