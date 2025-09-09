const form = document.querySelector("form");
const inputs = form.querySelectorAll("input, select");


function setError(input, message) {
  const box = input.closest(".input-box");
  if (box) {
    const span = box.querySelector("span");
    if (span) span.textContent = message;
  }
  input.classList.add("input-error");
}

function setSuccess(input) {
  const box = input.closest(".input-box");
  if (box) {
    const span = box.querySelector("span");
    if (span) span.textContent = "";
  }
  input.classList.remove("input-error");
}

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("input-error");
    const box = input.closest(".input-box");
    if (box) {
      const span = box.querySelector("span");
      if (span) span.textContent = "";
    }
  });
});


form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

 
  inputs.forEach((input) => {
    if (input.disabled) return;
    if (input.type === "radio" || input.type === "checkbox") return;

    if (!input.value.trim()) {
      setError(input, "Campo obrigatório");
      isValid = false;
      return;
    }


    if (input.id === "name" && input.value.trim().length < 3) {
      setError(input, "O nome deve ter pelo menos 3 caracteres");
      isValid = false;
      return;
    }

    if (input.name === "cpf" && input.value.trim().length !== 11) {
      setError(input, "O CPF deve ter 11 números");
      isValid = false;
      return;
    }

    if (input.id === "rg" && input.value.trim().length < 5) {
      setError(input, "O RG deve ter pelo menos 5 números");
      isValid = false;
      return;
    }

    if (input.type === "email" && !input.value.includes("@")) {
      setError(input, "O e-mail deve conter '@'");
      isValid = false;
      return;
    }

    if (input.type === "tel" && input.value.trim().length < 9) {
      setError(input, "O telefone deve ter pelo menos 9 dígitos");
      isValid = false;
      return;
    }

    setSuccess(input);
  });


  const selects = form.querySelectorAll("select");
  selects.forEach((select) => {
    if (!select.value) {
      setError(select, "Selecione uma opção");
      isValid = false;
    } else {
      setSuccess(select);
    }
  });


  const horarios = form.querySelectorAll('input[name="hora"]');
  const algumSelecionado = Array.from(horarios).some((h) => h.checked);

  if (!algumSelecionado) {
    let errorMsg = form.querySelector(".error-horario");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-horario");
      errorMsg.style.color = "red";
      errorMsg.style.display = "block";
      errorMsg.style.marginTop = "5px";
      form.querySelector(".horarios").appendChild(errorMsg);
    }
    errorMsg.textContent = "Selecione um horário";
    isValid = false;
  } else {
    const errorMsg = form.querySelector(".error-horario");
    if (errorMsg) errorMsg.remove();
  }

  if (isValid) {
    console.log("✅ Formulário válido, enviando...");
    form.submit();
  } else {
    console.log("❌ Formulário inválido, corrija os campos");
  }
});

$(document).ready(function(){
  $('#cpf').mask('000.000.000-00', {reverse: true});
  $('#rg').mask('00.000.000-0');
  $('#telefone').mask('(00) 00000-0000');
  $('#dt-visita').mask('00/00/0000'); 
   
  const nomeInput = document.getElementById('name');
  nomeInput.addEventListener('input', () => {
    nomeInput.value = nomeInput.value
      .replace(/[^a-zA-ZÀ-ÿ\s]/g, '')  
      .replace(/\b\w/g, l => l.toUpperCase());
  });
});

 const menuBtn = document.getElementById('menu');
  const nav = document.querySelector('.nav');

  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('show');
  });