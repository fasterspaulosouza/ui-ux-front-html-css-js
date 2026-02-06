document.addEventListener("DOMContentLoaded", function () {
  async function cadastrarUsuario(dados) {
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: dados,
        redirect: "follow",
      };

      const resposta = await fetch(
        "http://localhost:3000/usuarios",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      console.log(resposta);
    } catch (error) {
      console.log(error);
    }
  }

  const btnFinalizar = document.querySelector("#btn-finalizar");

  btnFinalizar.addEventListener("click", () => {
    // Campos da primeira parte do formulário
    const nome = document.querySelector("#nome").value;
    const sexoSelecionado = document.querySelector(
      'input[name="sexo"]:checked'
    ).value;
    const dataNascimento = document.querySelector("#nascimento").value;
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    const cpf = document.querySelector("#cpf").value;

    // Campos da segunda parte do formulário (Endereço)
    const cep = document.querySelector("#cep").value;
    const rua = document.querySelector("#rua").value;
    const bairro = document.querySelector("#bairro").value;
    const cidade = document.querySelector("#cidade").value;
    const estado = document.querySelector("#estado").value;
    const numero = document.querySelector("#numero").value;
    const complemento = document.querySelector("#complemento").value;

    const dados = JSON.stringify({
      nome: nome,
      email: email,
      senha: senha,
      sexo: sexoSelecionado,
      dtnascimento: dataNascimento,
      cpf: cpf,
      cep: cep,
      bairro: bairro,
      numero: numero,
      cidade: cidade,
      uf: estado,
      endereço: rua,
      complemento: complemento,
    });

    cadastrarUsuario(dados);
  });
});
