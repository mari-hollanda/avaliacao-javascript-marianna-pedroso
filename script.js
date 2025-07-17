document.addEventListener("DOMContentLoaded", function () {
  const inputTarefa = document.querySelector("#novaTarefa");
  const selectPrioridade = document.querySelector("#prioridade");
  const btnAdicionar = document.querySelector("#adicionarBtn");
  const tbody = document.querySelector("#listaTarefas");

  btnAdicionar.addEventListener("click", function () {
    const textoTarefa = inputTarefa.value.trim();
    const prioridade = selectPrioridade.value;

    if (!textoTarefa || !prioridade) return;

    const tr = document.createElement("tr");

    const tdTarefa = document.createElement("td");
    tdTarefa.textContent = textoTarefa;

    const tdPrioridade = document.createElement("td");
    const badge = document.createElement("span");
    badge.classList.add("badge");
    badge.textContent =
      prioridade.charAt(0).toUpperCase() + prioridade.slice(1);

    if (prioridade === "alta") {
      badge.classList.add("bg-danger");
    } else if (prioridade === "media") {
      badge.classList.add("bg-warning", "text-dark");
    } else if (prioridade === "baixa") {
      badge.classList.add("bg-success");
    }

    tdPrioridade.appendChild(badge);

    const tdAcao = document.createElement("td");
    const btnConcluir = document.createElement("button");
    btnConcluir.textContent = "Concluir";
    btnConcluir.classList.add("btn", "btn-success", "btn-sm");

    // EVENTO DO BOTÃO CONCLUIR
    btnConcluir.addEventListener("click", function () {
      const modal = new bootstrap.Modal(
        document.getElementById("confirmarExclusaoModal")
      );
      modal.show();

      const btnConfirmarSim = document.getElementById("confirmarSim");

      const novoBtnConfirmarSim = btnConfirmarSim.cloneNode(true);
      btnConfirmarSim.parentNode.replaceChild(
        novoBtnConfirmarSim,
        btnConfirmarSim
      );

      novoBtnConfirmarSim.addEventListener("click", function () {
        tr.remove();
        modal.hide();
      });
    });

    tdAcao.appendChild(btnConcluir);
    tr.appendChild(tdTarefa);
    tr.appendChild(tdPrioridade);
    tr.appendChild(tdAcao);
    tbody.appendChild(tr);

    inputTarefa.value = "";
    selectPrioridade.value = "";
  });
});
