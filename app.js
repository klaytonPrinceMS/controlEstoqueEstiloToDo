/**
 * Sistema de Estoque Enterprise v1.0.20250111
 * Arquivo: app.js
 * Descrição: Lógica principal da aplicação
 */

// ============================================
// SEGURANÇA: Hash de Senha (Básico)
// ============================================
const hash = (str) => btoa(str).split('').reverse().join('');

// ============================================
// ESTADO DO SISTEMA
// ============================================
let db = {
    usuarios: [
        { id: 'u1', nome: 'admin', senha: hash('admin'), tipo: 'admin', setorId: '', ip: '-', mac: '-', acesso: '-', bloqueado: false, primeiroAcesso: true }
    ],
    setores: [
        { id: 'estoque', nome: 'Estoque Central', emoji: '📦', cor: '#f8fafc', fixa: true, ordem: 0, bloqueado: false }
    ],
    itens: [],
    logs: []
};

let userLogado = null;
let itemAcao = null;
let setorDestinoAcao = null;
let setorEditando = null;

// ============================================
// OBTENÇÃO DE INFORMAÇÕES DE REDE LOCAL
// ============================================

/**
 * Obtém o IP local e informações do navegador como identificador
 */
async function obterInfoRede() {
    let ipLocal = 'Desconhecido';
    let macAddress = 'Não disponível via navegador';

    try {
        // Tenta obter IP local via WebRTC
        const pc = new RTCPeerConnection({ iceServers: [] });
        pc.createDataChannel('');

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const promise = new Promise((resolve) => {
            pc.onicecandidate = (ice) => {
                if (!ice || !ice.candidate || !ice.candidate.candidate) {
                    resolve();
                    return;
                }

                const parts = ice.candidate.candidate.split(' ');
                const ip = parts[4];

                if (ip && ip !== '0.0.0.0' && !ip.includes(':')) {
                    ipLocal = ip;
                }
            };
        });

        // Timeout de 2 segundos
        await Promise.race([
            promise,
            new Promise(resolve => setTimeout(resolve, 2000))
        ]);

        pc.close();
    } catch (e) {
        console.log('Não foi possível obter IP via WebRTC:', e);
    }

    // Gera um identificador único baseado no navegador (substitui MAC address)
    // MAC address não é acessível via navegador por questões de segurança
    const navegadorInfo = {
        userAgent: navigator.userAgent,
        idioma: navigator.language,
        plataforma: navigator.platform,
        cores: screen.colorDepth,
        resolucao: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    // Cria um hash simples como identificador único do dispositivo
    const deviceId = btoa(JSON.stringify(navegadorInfo)).substring(0, 17);
    macAddress = `ID-${deviceId}`;

    return {
        ip: ipLocal,
        mac: macAddress
    };
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    // Carrega dados do localStorage
    const salvo = localStorage.getItem('enterprise_stock_v1_0_20250111');
    if (salvo) {
        try {
            db = JSON.parse(salvo);
        } catch (e) {
            console.error('Erro ao carregar dados:', e);
        }
    }

    // Obtém informações de rede local
    const infoRede = await obterInfoRede();
    window.currentIP = infoRede.ip;
    window.currentMAC = infoRede.mac;
});

/**
 * Salva dados no localStorage
 */
function salvar() {
    try {
        localStorage.setItem('enterprise_stock_v1_0_20250111', JSON.stringify(db));
    } catch (e) {
        console.error('Erro ao salvar dados:', e);
        toast('Erro ao salvar dados!', 'erro');
    }
}

/**
 * Registra uma ação no log
 */
function registrarLog(msg) {
    if (!userLogado) return;

    const log = `[${new Date().toLocaleString()}] ${userLogado.nome} (IP: ${window.currentIP} | MAC: ${window.currentMAC}): ${msg}`;
    db.logs.unshift(log);

    // Mantém apenas os últimos 200 logs
    if (db.logs.length > 200) {
        db.logs.pop();
    }

    salvar();
}

// ============================================
// AUTENTICAÇÃO
// ============================================

/**
 * Reset de emergência - apaga todos os dados deve ser usado somente para teste e imprementaçção, uso real deve ser removido
 */
function resetEmergencia() {
    if (confirm("Isso apagará todos os dados e resetará o usuário para admin/admin. Confirma?")) {
        localStorage.clear();
        location.reload();
    }
}

/**
 * Realiza login do usuário
 */
function realizarLogin() {
    const username = document.getElementById('login-user').value.trim();
    const senha = document.getElementById('login-pass').value;

    if (!username || !senha) {
        return toast("Preencha todos os campos!", "erro");
    }

    // Carrega dados salvos
    const salvo = localStorage.getItem('enterprise_stock_v1_0_20250111');
    if (salvo) {
        try {
            db = JSON.parse(salvo);
        } catch (e) {
            console.error('Erro ao carregar dados:', e);
        }
    }

    // Busca usuário
    const usuario = db.usuarios.find(x => x.nome === username && x.senha === hash(senha));

    if (!usuario) {
        return toast("Usuário ou senha inválidos!", "erro");
    }

    if (usuario.bloqueado) {
        return toast("Usuário bloqueado pelo administrador!", "erro");
    }

    // Login bem-sucedido
    userLogado = usuario;
    usuario.ip = window.currentIP;
    usuario.mac = window.currentMAC;
    usuario.acesso = new Date().toLocaleString();

    document.getElementById('tela-login').classList.add('hidden');
    registrarLog("Login realizado");

    // Primeira vez: força mudança de senha
    if (usuario.primeiroAcesso) {
        const nova = prompt("Primeiro acesso! Digite sua nova senha:");
        if (nova) {
            usuario.senha = hash(nova);
            usuario.primeiroAcesso = false;
            toast("Senha atualizada!");
        }
    }

    salvar();
    atualizarInterface();
}

/**
 * Realiza logout do usuário
 */
function realizarLogout() {
    if (userLogado) {
        registrarLog("Logout realizado");
    }

    userLogado = null;
    document.getElementById('tela-login').classList.remove('hidden');
    document.getElementById('login-user').value = '';
    document.getElementById('login-pass').value = '';
}

// ============================================
// INTERFACE
// ============================================

/**
 * Atualiza a interface baseado no usuário logado
 */
function atualizarInterface() {
    if (!userLogado) return;

    document.getElementById('user-display').innerText = `${userLogado.nome} (${userLogado.tipo})`;

    const isAdmin = userLogado.tipo === 'admin';
    const isAlmox = userLogado.tipo === 'almoxarifado';

    // Mostra/esconde painéis administrativos
    document.getElementById('paineis-admin').classList.toggle('hidden', !isAdmin && !isAlmox);
    document.getElementById('painel-usuarios').classList.toggle('hidden', !isAdmin);
    document.getElementById('secao-auditoria').classList.toggle('hidden', !isAdmin);
    document.getElementById('btn-reset-total').classList.toggle('hidden', !isAdmin);

    // Painel de busca para usuários de setor
    document.getElementById('painel-busca-setor').classList.toggle('hidden', isAdmin || isAlmox);

    // Atualiza seletor de setores
    const selSetor = document.getElementById('cad-setor');
    selSetor.innerHTML = '<option value="">Sem Setor</option>' +
        db.setores.filter(s => s.id !== 'estoque').map(s => `<option value="${s.id}">${s.nome}</option>`).join('');

    if (isAdmin) {
        atualizarTabelaUsuarios();
    }

    atualizarQuadro();
}

/**
 * Atualiza o quadro de setores e itens
 */
function atualizarQuadro() {
    const quadroGestao = document.getElementById('quadro-gestao');
    const quadroSetores = document.getElementById('quadro-setores');
    const secaoGestao = document.getElementById('secao-estoque-solicitacoes');

    quadroGestao.innerHTML = '';
    quadroSetores.innerHTML = '';

    const isAdminOuAlmox = userLogado.tipo === 'admin' || userLogado.tipo === 'almoxarifado';
    secaoGestao.classList.toggle('hidden', !isAdminOuAlmox);

    // Define quais setores são visíveis
    let setoresVisiveis = [];
    if (isAdminOuAlmox) {
        setoresVisiveis = [...db.setores];
        if (db.itens.some(i => i.setorId === 'solicitacao')) {
            setoresVisiveis.push({ id: 'solicitacao', nome: 'Solicitações', emoji: '🔔', cor: '#fffaf0', fixa: true });
        }
    } else {
        setoresVisiveis = db.setores.filter(s => s.id === userLogado.setorId);
        document.getElementById('titulo-secao-setores').innerText = "Meu Setor";
    }

    // Ordena setores
    setoresVisiveis.sort((a, b) => (a.ordem || 0) - (b.ordem || 0));

    // Renderiza cada setor
    setoresVisiveis.forEach(setor => {
        const col = document.createElement('div');
        col.className = `coluna ${setor.fixa ? 'fixa' : ''} ${setor.bloqueado ? 'bloqueada' : ''}`;
        col.style.backgroundColor = setor.cor;
        col.id = `col-${setor.id}`;

        // Permite drag-drop para reordenação
        const podeMoverSetor = isAdminOuAlmox && !setor.fixa && setor.id !== 'solicitacao';
        if (podeMoverSetor) {
            col.draggable = true;
            col.ondragstart = (e) => {
                e.dataTransfer.setData('setorId', setor.id);
                col.classList.add('arrastando');
            };
            col.ondragend = () => col.classList.remove('arrastando');
            col.ondragover = (e) => e.preventDefault();
            col.ondrop = (e) => reordenarSetores(e, setor.id);
        }

        // HTML do cabeçalho
        col.innerHTML = `
            <div class="cabecalho-coluna ${!podeMoverSetor ? 'fixo' : ''}">
                <h3 style="margin:0">${setor.emoji} ${setor.nome} ${setor.bloqueado ? '🔒' : ''}</h3>
                <div style="display:flex; gap:5px; align-items:center;">
                    ${isAdminOuAlmox && setor.id !== 'estoque' && setor.id !== 'solicitacao' ? `
                        <button onclick="toggleBloqueioSetor('${setor.id}')" title="${setor.bloqueado ? 'Desbloquear' : 'Bloquear'} Setor" style="background:none; padding:0">
                            ${setor.bloqueado ? '🔓' : '🔒'}
                        </button>
                    ` : ''}
                    ${isAdminOuAlmox && !setor.fixa && setor.id !== 'solicitacao' ? `
                        <button onclick="abrirModalSetor('${setor.id}')" style="background:none; padding:0">✏️</button>
                        <button onclick="removerSetor('${setor.id}')" style="background:none; padding:0; color:red">×</button>
                    ` : ''}
                </div>
            </div>
            ${!isAdminOuAlmox ? `
                <div class="busca-interna">
                    <input type="text" placeholder="Buscar no meu setor..." oninput="filtrarItensSetor('${setor.id}', this.value)">
                </div>
            ` : ''}
            <div class="container-itens" ondragover="event.preventDefault()" ondrop="tratarDropItem(event, '${setor.id}')"></div>
        `;

        // Adiciona itens ao container
        const container = col.querySelector('.container-itens');
        db.itens.filter(i => i.setorId === setor.id).forEach(item => {
            container.appendChild(criarCartaoItem(item));
        });

        // Adiciona à seção apropriada
        if (setor.id === 'estoque' || setor.id === 'solicitacao') {
            quadroGestao.appendChild(col);
        } else {
            quadroSetores.appendChild(col);
        }
    });
}

/**
 * Cria um cartão visual para um item
 */
function criarCartaoItem(item) {
    const cartao = document.createElement('div');
    cartao.className = `cartao ${item.qtd === 0 ? 'zerado' : ''}`;
    cartao.dataset.nome = item.nome.toLowerCase();

    const isAdminOuAlmox = userLogado.tipo === 'admin' || userLogado.tipo === 'almoxarifado';
    const setor = db.setores.find(s => s.id === item.setorId);
    const setorBloqueado = setor ? setor.bloqueado : false;

    // Permite drag para itens do estoque
    const podeMover = isAdminOuAlmox && item.setorId === 'estoque' && item.qtd > 0;
    cartao.draggable = podeMover;
    if (podeMover) {
        cartao.ondragstart = (e) => e.dataTransfer.setData('itemId', item.id);
    }

    // Monta ações disponíveis
    let acoes = '';
    const eDono = userLogado.tipo === 'admin' || userLogado.setorId === item.setorId;

    if (item.setorId === 'estoque') {
        // Itens no estoque central
        if (isAdminOuAlmox) {
            acoes += `<button class="btn-sucesso" onclick="alterarQtd('${item.id}', 1)">+1</button>`;
            if (item.qtd === 0) {
                acoes += `<button class="btn-perigo" onclick="excluirItem('${item.id}')">Excluir</button>`;
            }
        }
    } else if (item.setorId === 'solicitacao') {
        // Itens em solicitação
        if (isAdminOuAlmox) {
            acoes += `<button class="btn-sucesso" onclick="atenderSolicitacao('${item.id}')">Atender</button>`;
            acoes += `<button class="btn-perigo" onclick="excluirItem('${item.id}')">Recusar</button>`;
        }
        acoes += `<div style="font-size:0.6rem; color:orange; width:100%">Para: ${db.setores.find(s => s.id === item.destino)?.nome}</div>`;
    } else {
        // Itens nos setores operacionais
        if (isAdminOuAlmox && item.qtd > 0) {
            acoes += `<button class="btn-alerta" onclick="resgatarItem('${item.id}')" title="Resgatar para o Estoque">↩️ Resgatar</button>`;
        }

        if (eDono && item.qtd > 0 && !setorBloqueado) {
            acoes += `<button class="btn-primario" onclick="utilizarItem('${item.id}')">Utilizar</button>`;
        }

        if (eDono && item.qtd === 0) {
            acoes += `<button class="btn-alerta" onclick="abrirSolicitacao('${item.id}')">Solicitar +</button>`;
        }

        if (setorBloqueado) {
            acoes = `<span style="color:var(--cor-perigo); font-size:0.7rem;">Setor Bloqueado</span>`;
        }
    }

    cartao.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center">
            <span style="font-weight:bold">${item.nome}</span>
            <span style="background:white; padding:2px 6px; border-radius:10px; font-size:0.7rem">Qtd: ${item.qtd}</span>
        </div>
        <div style="display:flex; gap:5px; justify-content:flex-end; margin-top:8px; flex-wrap:wrap;">${acoes}</div>
    `;

    return cartao;
}

// ============================================
// LÓGICA DE NEGÓCIO
// ============================================

/**
 * Resgata um item para o estoque
 */
function resgatarItem(id) {
    const item = db.itens.find(i => i.id === id);
    if (!item) return;

    const qtdResgate = parseInt(prompt(`Quantas unidades de ${item.nome} deseja resgatar para o estoque?`, item.qtd));
    if (isNaN(qtdResgate) || qtdResgate <= 0 || qtdResgate > item.qtd) {
        return toast("Quantidade inválida", "erro");
    }

    item.qtd -= qtdResgate;
    const est = db.itens.find(i => i.nome.toLowerCase() === item.nome.toLowerCase() && i.setorId === 'estoque');
    if (est) {
        est.qtd += qtdResgate;
    } else {
        db.itens.push({ id: Date.now().toString(), nome: item.nome, qtd: qtdResgate, setorId: 'estoque' });
    }

    registrarLog(`Resgatou ${qtdResgate} un de ${item.nome} do setor ${db.setores.find(s => s.id === item.setorId).nome}`);
    salvar();
    atualizarQuadro();
    toast("Item resgatado com sucesso!");
}

/**
 * Alterna o bloqueio de um setor
 */
function toggleBloqueioSetor(id) {
    const s = db.setores.find(x => x.id === id);
    if (!s) return;

    s.bloqueado = !s.bloqueado;
    registrarLog(`${s.bloqueado ? 'Bloqueou' : 'Desbloqueou'} o setor ${s.nome}`);
    salvar();
    atualizarQuadro();
}

/**
 * Filtra itens de um setor pela busca interna
 */
function filtrarItensSetor(setorId, termo) {
    const container = document.querySelector(`#col-${setorId} .container-itens`);
    if (!container) return;

    const cards = container.querySelectorAll('.cartao');
    cards.forEach(c => {
        c.classList.toggle('hidden', !c.dataset.nome.includes(termo.toLowerCase()));
    });
}

/**
 * Busca itens no estoque central
 */
function buscarNoEstoque(termo) {
    const resultados = document.getElementById('resultados-busca-estoque');
    resultados.innerHTML = '';

    if (termo.length < 2) return;

    const itensEstoque = db.itens.filter(i =>
        i.setorId === 'estoque' &&
        i.nome.toLowerCase().includes(termo.toLowerCase()) &&
        i.qtd > 0
    );

    if (itensEstoque.length === 0) {
        resultados.innerHTML = '<p style="font-size:0.8rem; color:gray;">Nenhum item disponível no estoque.</p>';
        return;
    }

    itensEstoque.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cartao';
        div.style.borderLeftColor = 'var(--cor-sucesso)';
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center">
                <span style="font-weight:bold">${item.nome}</span>
                <span style="font-size:0.7rem">Disp: ${item.qtd}</span>
            </div>
            <button class="btn-sucesso" style="width:100%; margin-top:5px;" onclick="solicitarItemBusca('${item.id}')">Solicitar</button>
        `;
        resultados.appendChild(div);
    });
}

/**
 * Abre modal para solicitar item encontrado na busca
 */
function solicitarItemBusca(id) {
    itemAcao = db.itens.find(x => x.id === id);
    if (!itemAcao) return;

    document.getElementById('info-solicitacao').innerText = `Solicitar ${itemAcao.nome} do Estoque Central`;
    document.getElementById('qtd-solicitar').max = itemAcao.qtd;
    document.getElementById('qtd-solicitar').value = 1;
    document.getElementById('modal-solicitar').style.display = 'flex';
}

/**
 * Confirma solicitação de item
 */
function confirmarSolicitacao() {
    const q = parseInt(document.getElementById('qtd-solicitar').value);
    const max = parseInt(document.getElementById('qtd-solicitar').max) || 999999;

    if (q < 1 || q > max) {
        return toast("Quantidade inválida ou superior ao estoque!", "erro");
    }

    db.itens.push({
        id: 'sol-' + Date.now(),
        nome: itemAcao.nome,
        qtd: q,
        setorId: 'solicitacao',
        destino: userLogado.setorId
    });

    registrarLog(`Solicitou ${q} un de ${itemAcao.nome}`);
    fecharModalSolicitar();
    salvar();
    atualizarQuadro();
    toast("Solicitação enviada!");
    document.getElementById('resultados-busca-estoque').innerHTML = '';
    document.getElementById('busca-global-estoque').value = '';
}

/**
 * Adiciona novo item ao estoque
 */
function adicionarItemEstoque() {
    const n = document.getElementById('busca-estoque').value.trim();
    const q = parseInt(document.getElementById('qtd-entrada').value);

    if (!n || q < 1) {
        return toast("Preencha todos os campos!", "erro");
    }

    const ex = db.itens.find(i => i.nome.toLowerCase() === n.toLowerCase() && i.setorId === 'estoque');
    if (ex) {
        ex.qtd += q;
        registrarLog(`Adicionado +${q} ao item ${n}`);
    } else {
        db.itens.push({ id: Date.now().toString(), nome: n, qtd: q, setorId: 'estoque' });
        registrarLog(`Criado novo item: ${n} com ${q} unidades`);
    }

    document.getElementById('busca-estoque').value = '';
    document.getElementById('busca-estoque').focus();
    salvar();
    atualizarQuadro();
    toast("Estoque atualizado!");
}

/**
 * Filtra itens no estoque pela busca
 */
function filtrarEstoque(val) {
    const cards = document.querySelectorAll('#col-estoque .cartao');
    cards.forEach(c => {
        const nome = c.querySelector('span').innerText.toLowerCase();
        c.classList.toggle('hidden', !nome.includes(val.toLowerCase()));
    });
}

/**
 * Utiliza um item (reduz quantidade)
 */
function utilizarItem(id) {
    const i = db.itens.find(x => x.id === id);
    const s = db.setores.find(x => x.id === i.setorId);

    if (s && s.bloqueado) {
        return toast("Setor bloqueado!", "erro");
    }

    if (i && i.qtd > 0) {
        i.qtd--;
        registrarLog(`Utilizou 1 un de ${i.nome} no setor ${s.nome}`);
        salvar();
        atualizarQuadro();
    }
}

/**
 * Abre modal para solicitar reposição
 */
function abrirSolicitacao(id) {
    itemAcao = db.itens.find(x => x.id === id);
    if (!itemAcao) return;

    const est = db.itens.find(i => i.nome.toLowerCase() === itemAcao.nome.toLowerCase() && i.setorId === 'estoque');
    const maxDisp = est ? est.qtd : 0;

    document.getElementById('info-solicitacao').innerText = `Solicitar reposição de ${itemAcao.nome} (Disponível no estoque: ${maxDisp})`;
    document.getElementById('qtd-solicitar').max = maxDisp;
    document.getElementById('modal-solicitar').style.display = 'flex';
}

/**
 * Atende uma solicitação de reposição
 */
function atenderSolicitacao(id) {
    const sol = db.itens.find(i => i.id === id);
    if (!sol) return;

    const est = db.itens.find(i => i.nome.toLowerCase() === sol.nome.toLowerCase() && i.setorId === 'estoque');

    if (!est || est.qtd < sol.qtd) {
        return toast("Estoque insuficiente!", "erro");
    }

    est.qtd -= sol.qtd;
    const dest = db.itens.find(i => i.nome.toLowerCase() === sol.nome.toLowerCase() && i.setorId === sol.destino);
    if (dest) {
        dest.qtd += sol.qtd;
    } else {
        db.itens.push({ id: Date.now().toString(), nome: sol.nome, qtd: sol.qtd, setorId: sol.destino });
    }

    db.itens = db.itens.filter(i => i.id !== id);
    registrarLog(`Atendeu solicitação de ${sol.qtd} un de ${sol.nome}`);
    salvar();
    atualizarQuadro();
    toast("Solicitação atendida!");
}

/**
 * Trata drop de item em um setor
 */
function tratarDropItem(e, destId) {
    const itemId = e.dataTransfer.getData('itemId');
    if (!itemId || destId === 'estoque' || destId === 'solicitacao') return;

    const setorDest = db.setores.find(s => s.id === destId);
    if (setorDest && setorDest.bloqueado) {
        return toast("Setor de destino está bloqueado!", "erro");
    }

    itemAcao = db.itens.find(i => i.id === itemId);
    if (!itemAcao) return;

    setorDestinoAcao = destId;
    document.getElementById('info-transferencia').innerText = `Enviar ${itemAcao.nome} para ${setorDest.nome}`;
    document.getElementById('qtd-transferir').max = itemAcao.qtd;
    document.getElementById('modal-transferir').style.display = 'flex';
}

/**
 * Confirma transferência de item
 */
function confirmarTransferencia() {
    const q = parseInt(document.getElementById('qtd-transferir').value);
    if (q < 1 || q > itemAcao.qtd) {
        return toast("Quantidade inválida!", "erro");
    }

    itemAcao.qtd -= q;
    const ex = db.itens.find(i => i.nome.toLowerCase() === itemAcao.nome.toLowerCase() && i.setorId === setorDestinoAcao);
    if (ex) {
        ex.qtd += q;
    } else {
        db.itens.push({ id: Date.now().toString(), nome: itemAcao.nome, qtd: q, setorId: setorDestinoAcao });
    }

    registrarLog(`Transferiu ${q} un de ${itemAcao.nome} para ${db.setores.find(s => s.id === setorDestinoAcao).nome}`);
    fecharModalTransferir();
    salvar();
    atualizarQuadro();
    toast("Transferência concluída!");
}

/**
 * Reordena setores via drag-drop
 */
function reordenarSetores(e, alvoId) {
    const arrId = e.dataTransfer.getData('setorId');
    if (arrId === alvoId) return;

    const idxA = db.setores.findIndex(s => s.id === arrId);
    const idxB = db.setores.findIndex(s => s.id === alvoId);
    const [rem] = db.setores.splice(idxA, 1);
    db.setores.splice(idxB, 0, rem);
    db.setores.forEach((s, i) => s.ordem = i);

    salvar();
    atualizarQuadro();
}

// ============================================
// GESTÃO DE USUÁRIOS
// ============================================

/**
 * Cria novo usuário
 */
function criarUsuario() {
    const n = document.getElementById('cad-user').value.trim();
    const s = document.getElementById('cad-pass').value.trim();
    const t = document.getElementById('cad-tipo').value;
    const sid = document.getElementById('cad-setor').value;

    if (!n || !s) {
        return toast("Preencha todos os campos!", "erro");
    }

    if (db.usuarios.some(u => u.nome === n)) {
        return toast("Usuário já existe!", "erro");
    }

    db.usuarios.push({
        id: 'u' + Date.now(),
        nome: n,
        senha: hash(s),
        tipo: t,
        setorId: sid,
        ip: '-',
        mac: '-',
        acesso: '-',
        bloqueado: false,
        primeiroAcesso: true
    });

    registrarLog(`Criou usuário: ${n}`);
    salvar();
    atualizarTabelaUsuarios();
    toast("Usuário cadastrado!");

    // Limpa formulário
    document.getElementById('cad-user').value = '';
    document.getElementById('cad-pass').value = '';
    document.getElementById('cad-tipo').value = 'setor';
    document.getElementById('cad-setor').value = '';
}

/**
 * Atualiza tabela de usuários
 */
function atualizarTabelaUsuarios() {
    const tbody = document.querySelector('#tabela-usuarios tbody');
    tbody.innerHTML = db.usuarios.map(u => `
        <tr>
            <td>${u.nome}</td>
            <td>${u.tipo}</td>
            <td>${db.setores.find(s => s.id === u.setorId)?.nome || '-'}</td>
            <td>${u.ip || '-'}</td>
            <td>${u.mac || '-'}</td>
            <td>${u.acesso}</td>
            <td>
                <button onclick="bloquearUsuario('${u.id}')" class="btn-alerta">${u.bloqueado ? 'Desbloquear' : 'Bloquear'}</button>
                <button onclick="resetarSenha('${u.id}')" class="btn-primario">Reset Senha</button>
                ${u.nome !== 'admin' ? `<button onclick="excluirUsuario('${u.id}')" class="btn-perigo">Excluir</button>` : ''}
            </td>
        </tr>
    `).join('');

    document.getElementById('log-container').innerHTML = db.logs.join('<br>');
}

/**
 * Bloqueia/desbloqueia um usuário
 */
function bloquearUsuario(id) {
    const u = db.usuarios.find(x => x.id === id);
    if (!u) return;

    u.bloqueado = !u.bloqueado;
    registrarLog(`${u.bloqueado ? 'Bloqueou' : 'Desbloqueou'} usuário ${u.nome}`);
    salvar();
    atualizarTabelaUsuarios();
}

/**
 * Reseta senha de um usuário
 */
function resetarSenha(id) {
    const u = db.usuarios.find(x => x.id === id);
    if (!u) return;

    const nova = prompt("Digite a senha temporária:");
    if (nova) {
        u.senha = hash(nova);
        u.primeiroAcesso = true;
        registrarLog(`Resetou senha do usuário ${u.nome}`);
        salvar();
        toast("Senha resetada!");
    }
}

/**
 * Exclui um usuário
 */
function excluirUsuario(id) {
    if (confirm("Excluir usuário permanentemente?")) {
        db.usuarios = db.usuarios.filter(u => u.id !== id);
        salvar();
        atualizarTabelaUsuarios();
    }
}

/**
 * Reseta todo o sistema
 */
function resetarSistema() {
    if (confirm("ATENÇÃO: Isso apagará TODOS os dados, itens e setores. Deseja continuar?")) {
        if (confirm("Deseja apagar também todos os usuários cadastrados (exceto admin)?")) {
            db.usuarios = db.usuarios.filter(u => u.nome === 'admin');
        }
        db.itens = [];
        db.setores = db.setores.filter(s => s.id === 'estoque');
        db.logs = [];
        registrarLog("RESET TOTAL DO SISTEMA");
        salvar();
        location.reload();
    }
}

// ============================================
// GESTÃO DE SETORES
// ============================================

/**
 * Abre modal para criar/editar setor
 */
function abrirModalSetor(id = null) {
    setorEditando = id ? db.setores.find(s => s.id === id) : null;
    document.getElementById('titulo-modal-setor').innerText = setorEditando ? "Editar Setor" : "Novo Setor";
    document.getElementById('setor-nome').value = setorEditando ? setorEditando.nome : "";
    document.getElementById('setor-emoji').value = setorEditando ? setorEditando.emoji : "";
    document.getElementById('setor-cor').value = setorEditando ? setorEditando.cor : "#ffffff";
    document.getElementById('modal-setor').style.display = 'flex';
}

/**
 * Salva um setor (novo ou editado)
 */
function salvarSetor() {
    const n = document.getElementById('setor-nome').value.trim();
    const e = document.getElementById('setor-emoji').value.trim() || '🏢';
    const c = document.getElementById('setor-cor').value;

    if (!n) {
        return toast("Nome do setor é obrigatório!", "erro");
    }

    if (setorEditando) {
        setorEditando.nome = n;
        setorEditando.emoji = e;
        setorEditando.cor = c;
        registrarLog(`Editou setor: ${n}`);
    } else {
        db.setores.push({
            id: 's' + Date.now(),
            nome: n,
            emoji: e,
            cor: c,
            fixa: false,
            ordem: db.setores.length,
            bloqueado: false
        });
        registrarLog(`Criou setor: ${n}`);
    }

    fecharModalSetor();
    salvar();
    atualizarInterface();
}

/**
 * Remove um setor
 */
function removerSetor(id) {
    if (db.itens.some(i => i.setorId === id && i.qtd > 0)) {
        return toast("Setor possui itens!", "erro");
    }

    db.setores = db.setores.filter(s => s.id !== id);
    salvar();
    atualizarInterface();
}

// ============================================
// MODAIS
// ============================================

function fecharModalSetor() {
    document.getElementById('modal-setor').style.display = 'none';
}

function fecharModalTransferir() {
    document.getElementById('modal-transferir').style.display = 'none';
}

function fecharModalSolicitar() {
    document.getElementById('modal-solicitar').style.display = 'none';
}

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Mostra notificação toast
 */
function toast(m, t = 'sucesso') {
    const c = document.getElementById('container-toast');
    const d = document.createElement('div');
    d.className = `toast ${t}`;
    d.innerText = m;
    c.appendChild(d);
    setTimeout(() => d.remove(), 3000);
}

/**
 * Exclui um item
 */
function excluirItem(id) {
    if (confirm("Excluir registro?")) {
        db.itens = db.itens.filter(i => i.id !== id);
        salvar();
        atualizarQuadro();
    }
}

/**
 * Altera quantidade de um item
 */
function alterarQtd(id, n) {
    const i = db.itens.find(x => x.id === id);
    if (!i) return;

    i.qtd += n;
    if (i.qtd < 0) i.qtd = 0;

    salvar();
    atualizarQuadro();
}