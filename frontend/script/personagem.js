const API_URL = 'http://localhost:8080/api/personagens11';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("personagemForm");
    const idInput = document.getElementById("personagemId");
    const nomeInput = document.getElementById("nome");
    const classeSelect = document.getElementById("classe");
    const nivelInput = document.getElementById("nivel");
    const atributoSelect = document.getElementById("atributo");
    const corpoTabela = document.getElementById("corpoTabela");

    carregarPersonagens();

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = idInput.value;
        const personagem = {
            nome: nomeInput.value,
            classe: classeSelect.value,
            nivel: parseInt(nivelInput.value),
            atributo: atributoSelect.value
        };

        const isEdicao = Boolean(id);
        const url = isEdicao ? `${API_URL}/${id}` : API_URL;
        const method = isEdicao ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(personagem)
            });

            if (response.ok) {
                form.reset();
                idInput.value = "";
                carregarPersonagens();
            } else {
                const erro = await response.text();
                alert(`Erro na validação do servidor: ${erro}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro de conexão com a API.");
        }
    });

    async function carregarPersonagens() {
        try {
            const response = await fetch(API_URL);
            const personagens = await response.json();

            corpoTabela.innerHTML = "";

            personagens.forEach((p) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${p.classe}</td>
                    <td>${p.nome}</td>
                    <td>${p.nivel}</td>
                    <td>${p.atributo}</td>
                    <td>
                        <button class="btn-editar" data-id="${p.id}">Editar</button>
                        <button class="btn-excluir" data-id="${p.id}">Excluir</button>
                    </td>
                `;

                tr.querySelector(".btn-editar").addEventListener("click", () => preencherFormulario(p));
                tr.querySelector(".btn-excluir").addEventListener("click", () => deletarPersonagem(p.id));

                corpoTabela.appendChild(tr);
            });
        } catch (error) {
            console.error("Erro ao listar personagens:", error);
        }
    }

    function preencherFormulario(p) {
        idInput.value = p.id;
        nomeInput.value = p.nome;
        classeSelect.value = p.classe.toLowerCase();
        nivelInput.value = p.nivel;
        atributoSelect.value = p.atributo;
}

    async function deletarPersonagem(id) {
        if (!confirm("Deseja realmente excluir este personagem?")) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                carregarPersonagens();
            } else {
                alert("Erro ao excluir personagem.");
            }
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
    }
});