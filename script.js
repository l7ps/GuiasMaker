// Função para salvar dados no localStorage
function salvarNoLocalStorage(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

// Função para carregar dados do localStorage
function carregarDoLocalStorage(chave) {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
}

// Inicializar arrays com dados do localStorage (se existirem)
let clinicas = carregarDoLocalStorage('clinicas') || [];
let medicos = carregarDoLocalStorage('medicos') || [];
let pacientes = carregarDoLocalStorage('pacientes') || [];
let colaboradores = carregarDoLocalStorage('colaboradores') || [];

// Função para gerar um ID único
function gerarId() {
    return Math.random().toString(36).substr(2, 9);
}

// Função para cadastrar clínica
document.getElementById('formClinica')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('clinicaNome').value;
    const logo = document.getElementById('clinicaLogo').files[0];

    if (nome && logo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const novaClinica = {
                id: gerarId(),
                nome: nome,
                logo: e.target.result
            };
            clinicas.push(novaClinica);
            salvarNoLocalStorage('clinicas', clinicas);
            atualizarTabelaClinicas();
            alert('Clínica cadastrada com sucesso!');
            document.getElementById('clinicaNome').value = '';
            document.getElementById('clinicaLogo').value = '';
        };
        reader.readAsDataURL(logo);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Função para cadastrar médico
document.getElementById('formMedico')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('medicoNome').value;
    const especialidade = document.getElementById('medicoEspecialidade').value;
    const valor = document.getElementById('medicoValor').value;
    const clinicaId = document.getElementById('clinicaSelecionada').value;

    if (nome && especialidade && valor && clinicaId) {
        const novoMedico = {
            id: gerarId(),
            nome: nome,
            especialidade: especialidade,
            valor: valor,
            clinicaId: clinicaId
        };
        medicos.push(novoMedico);
        salvarNoLocalStorage('medicos', medicos);
        atualizarTabelaMedicos();
        alert('Médico cadastrado com sucesso!');
        document.getElementById('medicoNome').value = '';
        document.getElementById('medicoEspecialidade').value = '';
        document.getElementById('medicoValor').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Função para cadastrar paciente
document.getElementById('formPaciente')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('pacienteNome').value;
    const cartao = document.getElementById('pacienteCartao').value;
    const dn = document.getElementById('pacienteDN').value;
    const cpf = document.getElementById('pacienteCPF').value;
    const contato = document.getElementById('pacienteContato').value;

    if (nome && cartao && dn && cpf && contato) {
        const novoPaciente = {
            id: gerarId(),
            nome: nome,
            cartao: cartao,
            dn: dn,
            cpf: cpf,
            contato: contato
        };
        pacientes.push(novoPaciente);
        salvarNoLocalStorage('pacientes', pacientes);
        atualizarTabelaPacientes();
        alert('Paciente cadastrado com sucesso!');
        document.getElementById('pacienteNome').value = '';
        document.getElementById('pacienteCartao').value = '';
        document.getElementById('pacienteDN').value = '';
        document.getElementById('pacienteCPF').value = '';
        document.getElementById('pacienteContato').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Função para cadastrar colaborador
document.getElementById('formColaborador')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('colaboradorNome').value;
    const assinatura = document.getElementById('colaboradorAssinatura').files[0];

    if (nome && assinatura) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const novoColaborador = {
                id: gerarId(),
                nome: nome,
                assinatura: e.target.result
            };
            colaboradores.push(novoColaborador);
            salvarNoLocalStorage('colaboradores', colaboradores);
            atualizarTabelaColaboradores();
            alert('Colaborador cadastrado com sucesso!');
            document.getElementById('colaboradorNome').value = '';
            document.getElementById('colaboradorAssinatura').value = '';
        };
        reader.readAsDataURL(assinatura);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Função para atualizar a tabela de clínicas
function atualizarTabelaClinicas() {
    const tbody = document.querySelector("#tabelaClinicas tbody");
    if (tbody) {
        tbody.innerHTML = clinicas.map((clinica, index) => `
            <tr>
                <td>${clinica.nome}</td>
                <td><img src="${clinica.logo}" alt="Logo" style="max-width: 50px;"></td>
                <td>
                    <button onclick="abrirModalEdicao(${index}, 'clinica')" class="btn-edit"><i class="fas fa-edit"></i></button>
                    <button onclick="excluirItem(${index}, 'clinica')" class="btn-delete"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join("");
    }
}

// Função para atualizar a tabela de médicos
function atualizarTabelaMedicos() {
    const tbody = document.querySelector("#tabelaMedicos tbody");
    if (tbody) {
        tbody.innerHTML = medicos.map((medico, index) => `
            <tr>
                <td>${medico.nome}</td>
                <td>${medico.especialidade}</td>
                <td>R$ ${medico.valor}</td>
                <td>${clinicas.find(c => c.id === medico.clinicaId)?.nome || 'N/A'}</td>
                <td>
                    <button onclick="abrirModalEdicao(${index}, 'medico')" class="btn-edit"><i class="fas fa-edit"></i></button>
                    <button onclick="excluirItem(${index}, 'medico')" class="btn-delete"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join("");
    }
}

// Função para atualizar a tabela de pacientes
function atualizarTabelaPacientes() {
    const tbody = document.querySelector("#tabelaPacientes tbody");
    if (tbody) {
        tbody.innerHTML = pacientes.map((paciente, index) => `
            <tr>
                <td>${paciente.nome}</td>
                <td>${paciente.cartao}</td>
                <td>${paciente.dn}</td>
                <td>${paciente.cpf}</td>
                <td>${paciente.contato}</td>
                <td>
                    <button onclick="abrirModalEdicao(${index}, 'paciente')" class="btn-edit"><i class="fas fa-edit"></i></button>
                    <button onclick="excluirItem(${index}, 'paciente')" class="btn-delete"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join("");
    }
}

// Função para atualizar a tabela de colaboradores
function atualizarTabelaColaboradores() {
    const tbody = document.querySelector("#tabelaColaboradores tbody");
    if (tbody) {
        tbody.innerHTML = colaboradores.map((colaborador, index) => `
            <tr>
                <td>${colaborador.nome}</td>
                <td><img src="${colaborador.assinatura}" alt="Assinatura" style="max-width: 50px;"></td>
                <td>
                    <button onclick="abrirModalEdicao(${index}, 'colaborador')" class="btn-edit"><i class="fas fa-edit"></i></button>
                    <button onclick="excluirItem(${index}, 'colaborador')" class="btn-delete"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join("");
    }
}

// Carregar dados ao abrir a página
window.onload = function () {
    atualizarTabelaClinicas();
    atualizarTabelaMedicos();
    atualizarTabelaPacientes();
    atualizarTabelaColaboradores();
};