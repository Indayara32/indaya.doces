// === CONFIGURAÇÃO DA LOJA ===
const numeroWhatsApp = "5521993282079"; // DDD 21 do Rio + número
const nomeLoja = "Indaya Doces";

// === CARRINHO ===
let carrinho = [];

const listaCarrinho = document.getElementById("lista-carrinho");
const totalSpan = document.getElementById("total");
const btnWhatsApp = document.getElementById("btn-whatsapp");

// === ADICIONAR PRODUTO ===
document.querySelectorAll(".btn-add").forEach(botao => {
  botao.addEventListener("click", () => {
    const nome = botao.getAttribute("data-nome");
    const preco = parseFloat(botao.getAttribute("data-preco"));

    // Verifica se já tem no carrinho
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
      itemExistente.qtd += 1;
    } else {
      carrinho.push({ nome, preco, qtd: 1 });
    }

    atualizarCarrinho();
  });
});

// === ATUALIZAR CARRINHO NA TELA ===
function atualizarCarrinho() {
  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = `<p class="vazio">Carrinho vazio<br>Adicione produtos 😋</p>`;
    totalSpan.textContent = "0,00";
    return;
  }

  let html = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.qtd;
    total += subtotal;

    html += `
      <div class="item-carrinho" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px dashed #eee; padding-bottom:8px;">
        <div>
          <strong>${item.nome}</strong><br>
          <small>R$ ${item.preco.toFixed(2)} x ${item.qtd}</small>
        </div>
        <div style="text-align:right;">
          <strong>R$ ${subtotal.toFixed(2)}</strong><br>
          <button onclick="removerItem(${index})" style="background:none; border:none; color:#ff4d94; cursor:pointer; font-size:12px;">Remover</button>
        </div>
      </div>
    `;
  });

  listaCarrinho.innerHTML = html;
  totalSpan.textContent = total.toFixed(2).replace(".", ",");
}

// === REMOVER ITEM ===
function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

// === ENVIAR WHATSAPP ===
btnWhatsApp.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Adicione pelo menos 1 doce no carrinho 😋");
    return;
  }

  let mensagem = `*Olá! Quero fazer um pedido na ${nomeLoja}* 🍰\n\n`;
  
  carrinho.forEach(item => {
    mensagem += `*${item.qtd}x* ${item.nome} - R$ ${(item.preco * item.qtd).toFixed(2).replace(".", ",")}\n`;
  });

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0);
  mensagem += `\n*Total: R$ ${total.toFixed(2).replace(".", ",")}*\n\n`;
  mensagem += `_Aguardo a confirmação do frete e forma de pagamento. Obrigado!_`;

  // Codifica a mensagem pra URL
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  
  // Abre o WhatsApp
  window.open(url, "_blank");
});