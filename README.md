
# Roberta | Terapia Integrativa

Landing page institucional de Terapia Integrativa, criada para apresentar o serviço e direcionar o visitante para contato e agendamento.

O objetivo do projeto foi desenvolver uma página leve, acolhedora e funcional, focada em conversão, utilizando apenas HTML, CSS e JavaScript puro.

---

## 🎯 Objetivo do projeto

Criar uma landing page simples e responsiva para:

- Apresentar a Terapia Integrativa
- Explicar os benefícios do atendimento
- Facilitar o contato através de formulário
- Direcionar o usuário para agendamento via WhatsApp

Todo o layout foi pensado para ser direto, clean e com foco em experiência do usuário.

---

## ✅ Funcionalidades

- Header fixo com menu responsivo
- Seções de apresentação, sobre, contato e chamada para ação
- Lista de benefícios
- Formulário de contato integrado com EmailJS (sem backend)
- Modal de termos de atendimento
- Seleção do tipo de sessão
- Redirecionamento automático para WhatsApp com mensagem pronta
- Design responsivo (desktop e mobile)

---

## 🧱 Tecnologias utilizadas

- HTML5  
- CSS3  
- JavaScript (Vanilla JS)  
- EmailJS  

---

## 📁 Estrutura do projeto

/
├─ index.html
├─ style.css
├─ script.js
└─ img/
├─ sec1.webp
├─ sec2.webp
├─ sec3.webp
└─ sec4.webp

---

## ▶️ Como executar localmente

Você pode abrir o arquivo `index.html` diretamente no navegador.

Ou utilizar um servidor local:

## Usando Python

Dentro da pasta do projeto:

```bash
python -m http.server 5500
Depois abra no navegador:

http://localhost:5500
✉️ Configuração do formulário (EmailJS)
O formulário utiliza EmailJS para envio das mensagens.

No arquivo script.js, configure:

EMAIL_PUBLIC_KEY

EMAIL_SERVICE_ID

EMAIL_TEMPLATE_ID

No painel do EmailJS, o template deve conter as variáveis:

nome

email

telefone

mensagem

📲 Agendamento via WhatsApp
Após aceitar o termo de atendimento, o usuário é direcionado automaticamente para o WhatsApp com uma mensagem pronta.

No script.js, é possível alterar:

Número do WhatsApp

Texto da mensagem

Código PIX (caso necessário)

🖼️ Imagens
As imagens de fundo ficam na pasta img/.

Caso queira trocar, mantenha os nomes ou atualize os caminhos no style.css.

📌 Possíveis melhorias futuras
Máscara de telefone no formulário

Feedback visual de carregamento ao enviar mensagem

SEO básico (meta tags)

Página “Sobre mim” mais completa

Integração com Google Analytics

📄 Observação
Este projeto foi desenvolvido como prática de front-end e para uso real em um atendimento de Terapia Integrativa.

📜 Licença
Uso livre para fins pessoais e educacionais.
