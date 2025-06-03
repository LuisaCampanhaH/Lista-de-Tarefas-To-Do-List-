document.addEventListener('DOMContentLoaded', () => {
    const inputNovaTarefa = document.getElementById('nova-tarefa');
    const btnAdicionarTarefa = document.getElementById('adicionar-tarefa');
    const listaTarefas = document.getElementById('lista-tarefas');

    // Carregar tarefas do Local Storage ao iniciar
    carregarTarefas();

    btnAdicionarTarefa.addEventListener('click', adicionarTarefa);
    inputNovaTarefa.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            adicionarTarefa();
        }
    });

    function adicionarTarefa() {
        const textoTarefa = inputNovaTarefa.value.trim();
        if (textoTarefa === '') {
            alert('Por favor, digite uma tarefa!');
            return;
        }

        criarItemTarefa(textoTarefa);
        salvarTarefas();
        inputNovaTarefa.value = '';
        inputNovaTarefa.focus();
    }

    function criarItemTarefa(texto, concluida = false) {
        const itemLista = document.createElement('li');
        itemLista.textContent = texto;
        if (concluida) {
            itemLista.classList.add('concluida');
        }

        // Botão de remover
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.addEventListener('click', () => {
            listaTarefas.removeChild(itemLista);
            salvarTarefas();
        });

        // Marcar como concluída ao clicar na tarefa
        itemLista.addEventListener('click', () => {
            itemLista.classList.toggle('concluida');
            salvarTarefas();
        });

        itemLista.appendChild(btnRemover);
        listaTarefas.appendChild(itemLista);
    }

    function salvarTarefas() {
        const tarefas = [];
        listaTarefas.querySelectorAll('li').forEach(item => {
            tarefas.push({
                texto: item.childNodes[0].nodeValue.trim(), // Pega o texto antes do botão
                concluida: item.classList.contains('concluida')
            });
        });
        localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
    }

    function carregarTarefas() {
        const tarefasSalvas = localStorage.getItem('minhasTarefas');
        if (tarefasSalvas) {
            const tarefasArray = JSON.parse(tarefasSalvas);
            tarefasArray.forEach(tarefa => {
                criarItemTarefa(tarefa.texto, tarefa.concluida);
            });
        }
    }
});
