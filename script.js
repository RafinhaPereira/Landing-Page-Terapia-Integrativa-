document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // 1) EmailJS: inicialização
  // =========================================================
  const EMAIL_PUBLIC_KEY = "0n35cs-7YZPibCTAn";
  const EMAIL_SERVICE_ID = "service_h6cm8tv";
  const EMAIL_TEMPLATE_ID = "template_y4vgsc3";

  if (window.emailjs) {
    emailjs.init({ publicKey: EMAIL_PUBLIC_KEY });
  } else {
    console.warn("EmailJS não carregou. Confira o <script> no HTML.");
  }

  // =========================================================
  // 2) Formulário: enviar mensagem (EmailJS)
  // =========================================================
  const btnEnviar = document.getElementById("enviarWhatsApp");
  const nomeEl = document.getElementById("nome");
  const emailEl = document.getElementById("email");
  const telEl = document.getElementById("telefone");
  const msgEl = document.getElementById("mensagem");

  function getFieldValue(el) {
    return (el?.value || "").trim();
  }

  function clearFields(fields) {
    fields.forEach((f) => {
      if (f) f.value = "";
    });
  }

  if (btnEnviar && nomeEl && emailEl && telEl && msgEl) {
    btnEnviar.addEventListener("click", (e) => {
      e.preventDefault();

      const nome = getFieldValue(nomeEl);
      const email = getFieldValue(emailEl);
      const telefone = getFieldValue(telEl);
      const mensagem = getFieldValue(msgEl);

      if (!nome || !email || !telefone || !mensagem) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      if (!window.emailjs) {
        alert("Erro: EmailJS não carregou.");
        return;
      }

      emailjs
        .send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, { nome, email, telefone, mensagem })
        .then(() => {
          alert("Mensagem enviada com sucesso!");
          clearFields([nomeEl, emailEl, telEl, msgEl]);
        })
        .catch(() => alert("Erro ao enviar mensagem."));
    });
  }

  // =========================================================
  // 3) Menu mobile: abre/fecha sem "piscar"
  // =========================================================
  const menuToggle = document.getElementById("menuToggle");
  const menuNav = document.getElementById("menuNav");

  if (menuToggle && menuNav) {
    const closeMenu = () => menuNav.classList.remove("active");
    const toggleMenu = () => menuNav.classList.toggle("active");

    // No mobile, pointerdown evita o duplo toggle (click + touch)
    menuToggle.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    // Impede clique dentro do menu ser interpretado como clique fora
    const stop = (e) => e.stopPropagation();
    menuNav.addEventListener("pointerdown", stop);
    menuNav.addEventListener("click", stop);

    // Fecha ao clicar em um link
    menuNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Fecha ao clicar fora
    document.addEventListener("pointerdown", (e) => {
      const clicouNoMenu = menuNav.contains(e.target);
      const clicouNoToggle = menuToggle.contains(e.target);
      if (!clicouNoMenu && !clicouNoToggle) closeMenu();
    });

    // Se voltar para desktop, fecha o menu
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });

    // Acessibilidade: Enter/Espaço
    menuToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  // =========================================================
  // 4) Modal: termo + direcionar para WhatsApp com texto pronto
  // =========================================================
  const modal = document.getElementById("modal");
  const openTermos = document.getElementById("openTermos");
  const closeModal = document.getElementById("closeModal");
  const aceiteTermos = document.getElementById("aceiteTermos");
  const btnProsseguir = document.getElementById("btnProsseguir");
  const tipoConsulta = document.getElementById("tipoConsulta");

  const WHATSAPP_NUMBER = "5511987943258";
  const PIX_CODE =
    "00020126580014BR.GOV.BCB.PIX0136a35167ca-f8be-48e4-b51e-569fb1ac3dea5204000053039865802BR5922Roberta da Silva Sousa6009SAO PAULO62140510J9aFz7eSKZ63046AAE";

  function openModal() {
    if (!modal) return;
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    if (aceiteTermos) aceiteTermos.checked = false;
    if (btnProsseguir) btnProsseguir.disabled = true;
  }

  function hideModal() {
    if (!modal) return;
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }

  function buildWhatsappText() {
    const value = tipoConsulta?.value;

    const options = {
      "30min": { label: "Sessão 30 min", price: "R$25" },
      "60min": { label: "Sessão 60 min", price: "R$50" },
    };

    const selected = options[value] || options["30min"];

    return (
      `Olá! Gostaria de agendar uma sessão de Terapia Integrativa.\n` +
      `Tipo: ${selected.label} (${selected.price})\n` +
      `PIX: ${PIX_CODE}`
    );
  }

  if (modal && openTermos && closeModal && aceiteTermos && btnProsseguir && tipoConsulta) {
    openTermos.addEventListener("click", openModal);
    closeModal.addEventListener("click", hideModal);

    // Fecha se clicar no fundo do modal
    modal.addEventListener("click", (e) => {
      if (e.target === modal) hideModal();
    });

    // Habilita botão ao aceitar termos
    aceiteTermos.addEventListener("change", () => {
      btnProsseguir.disabled = !aceiteTermos.checked;
    });

    // Vai para WhatsApp com mensagem pronta
    btnProsseguir.addEventListener("click", () => {
      const texto = buildWhatsappText();
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
      window.open(url, "_blank");
      hideModal();
    });
  }

  // =========================================================
  // 5) Auto-esconder header no desktop (pra ficar clean)
  // =========================================================
  if (window.innerWidth > 768) {
    const header = document.querySelector("header");
    if (!header) return;

    let timeout;
    let modalAberto = false;

    function mostrarMenu() {
      if (modalAberto) return;

      header.classList.remove("hide");
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        header.classList.add("hide");
      }, 1500);
    }

    window.addEventListener("mousemove", mostrarMenu);
    window.addEventListener("scroll", mostrarMenu);

    // Se abrir o modal, não esconde
    const openTermosBtn = document.getElementById("openTermos");
    const closeModalBtn = document.getElementById("closeModal");
    const modalEl = document.getElementById("modal");

    openTermosBtn?.addEventListener("click", () => {
      modalAberto = true;
      header.classList.remove("hide");
    });

    closeModalBtn?.addEventListener("click", () => {
      modalAberto = false;
      mostrarMenu();
    });

    modalEl?.addEventListener("click", (e) => {
      if (e.target === modalEl) {
        modalAberto = false;
        mostrarMenu();
      }
    });

    mostrarMenu();
  }
});
