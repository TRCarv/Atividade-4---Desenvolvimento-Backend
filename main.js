const tarefas = [];

function adicionarTarefa(id, titulo, prioridade, concluido) {
    if (typeof id !== "number") {
        throw new Error("O id deve ser um número.");
    }
    if (typeof titulo !== "string") {
        throw new Error("O titulo deve ser um texto");
    }
    if (
        prioridade !== "alta" &&
        prioridade !== "media" &&
        prioridade !== "baixa"
    ) {
        throw new Error("A prioridade deve ser alta, media ou baixa.");
    }
    if (typeof concluido !== "boolean") {
        throw new Error(
            "Concluído deve ser um valor booleano (true ou false).",
        );
    }

    const novaTarefa = {
        id: id,
        titulo: titulo,
        prioridade: prioridade,
        concluido: concluido,
    };

    tarefas.push(novaTarefa);
}

function listarTarefa(tarefas) {
    tarefas.forEach((u) => {
        console.log(`Titulo: ${u.titulo} - Concluído: ${u.concluido}`);
    });
}

function concluirTarefa(tarefas, nomeTarefa) {
    // aqui pensei em utilizar Truly e Falsy para determinar se encontrou ou não a tarefa
    const tarefa = tarefas.find((u) => u.titulo === nomeTarefa);

    if (!tarefa) {
        console.log("Tarefa não encontrada");
    } else if (tarefa.concluido === true) {
        console.log("Tarefa já consta como concluída");
    } else {
        tarefa.concluido = true;
        console.log("Tarefa concluída com sucesso!");
    }
}

function removerTarefa(tarefas, nomeTarefa) {
    const indiceTarefa = tarefas.findIndex((u) => u.titulo === nomeTarefa);
    // se não encontrar a tarefa, o indiceTarefa será -1
    if (indiceTarefa === -1) {
        console.log("Tarefa não encontrada.");
    } else {
        tarefas.splice(indiceTarefa, 1);
        console.log("Tarefa removida com sucesso!");
    }
}

function listarPorPrioridade(tarefas, prioridade) {
    const lista = tarefas.filter((u) => u.prioridade === prioridade);
    console.log(`Lista de Tarefas de prioridade ${prioridade}`);
    for (let item of lista) {
        console.log(`Tarefa: ${item.titulo}`);
    }
}

function resumoDeTarefas(tarefas) {
    const resumo = tarefas.reduce((acumulador, tarefa) => {
        // se já existe a prioridade soma 1 ao contador, caso contrário cria o contador
        if (acumulador[tarefa.prioridade]) {
            acumulador[tarefa.prioridade] += 1;
        } else {
            acumulador[tarefa.prioridade] = 1;
        }
        return acumulador;
    }, {});

    return resumo;
}

function aguardarDoisSegundos() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const conexaoFuncionou = Math.random() > 0.2; // maior que 0.2 dá true. Só para simular a reject em alguns casos

            if (conexaoFuncionou) {
                resolve(); // Conseguiu conectar com o servidor
            } else {
                reject(new Error("Servidor fora do ar!")); // Não conseguiu
            }
        }, 2000);
    });
}

async function sincronizarComServidor(tarefas) {
    console.log("Sincronizando...");

    try {
        await aguardarDoisSegundos();
        console.log("Tarefas sincronizadas com sucesso!");
        listarTarefa(tarefas);
    } catch (e) {
        console.log(
            "(simulação de falha! Rode novamente o código algumas vezes para ver o resultado esperado. Falha ao sincronizar as tarefas:",
            e.message,
        );
    }
}

// Aqui o script de teste:

// Utilizei o gemini para criar as tarefas abaixo:
adicionarTarefa(1, "Fazer compras do mês", "alta", false);
adicionarTarefa(2, "Pagar boleto da internet", "alta", true);
adicionarTarefa(3, "Ler capítulo 4 do livro", "media", false);
adicionarTarefa(4, "Limpar a casa", "media", true);
adicionarTarefa(5, "Organizar as pastas do computador", "baixa", false);
adicionarTarefa(6, "Responder e-mails de clientes", "alta", false);
adicionarTarefa(7, "Passear com o cachorro", "media", true);
adicionarTarefa(8, "Agendar consulta médica", "alta", false);
adicionarTarefa(9, "Assistir aula de React", "media", true);
adicionarTarefa(10, "Lavar o carro", "baixa", false);
adicionarTarefa(11, "Revisar código do projeto", "alta", false);
adicionarTarefa(12, "Fazer exercícios de JavaScript", "alta", true);
adicionarTarefa(13, "Preparar o almoço", "media", true);
adicionarTarefa(14, "Regar as plantas", "baixa", true);
adicionarTarefa(15, "Atualizar o currículo", "media", false);
adicionarTarefa(16, "Comprar presente de aniversário", "alta", false);
adicionarTarefa(17, "Fazer backup dos arquivos", "alta", true);
adicionarTarefa(18, "Assistir ao novo episódio da série", "baixa", false);
adicionarTarefa(19, "Estudar para a prova de banco de dados", "alta", false);
adicionarTarefa(20, "Trocar a lâmpada da sala", "baixa", true);
adicionarTarefa(21, "Estudar", "alta", true);
adicionarTarefa(22, "Tomar banho", "media", false);

// simulando a conclusão de tarefas:
concluirTarefa(tarefas, "Fazer compras do mês");
concluirTarefa(tarefas, "Agendar consulta médica");
// para demonstrar a checagem se a tarefa já está concluida e se existe:
concluirTarefa(tarefas, "tarefa que não existe");
concluirTarefa(tarefas, "Trocar a lâmpada da sala");

// imprimindo o resumo de tarefas por prioridade:
const resumo = resumoDeTarefas(tarefas);
console.log(resumo);

sincronizarComServidor(tarefas);
