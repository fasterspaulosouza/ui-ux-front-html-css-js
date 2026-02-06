document.addEventListener("DOMContentLoaded", function () {
  // Recuperando o item usuário
  const usuarioSalvo = localStorage.getItem("usuario");

  // Convertendo de volta para objeto
  const usuarioObj = JSON.parse(usuarioSalvo);

  document.querySelector("#imagemPerfil").src = usuarioObj.foto;
  document.querySelector("#nomePerfil").innerText = usuarioObj.nome;
  document.querySelector("#emailPerfil").innerText = usuarioObj.email;

  // Loggoff
  const btnSair = document.querySelector("#btnSair");
  btnSair.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    alert("Usuário foi deslogado com sucesso!");
    window.location.href = "/index.html";
  });

  // Chamada API para carregar nossas publicaçoes:

  const requestOptions = {
    method: "GET",
  };

  const caixaPublicacoes = document.getElementById("publicacoes");

  fetch("http://localhost:3000/publicacoes", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      caixaPublicacoes.innerHTML = "";
      let conteudo = "";

      result.forEach((pub) => {
        conteudo = `
          <div class="publicacao">
            <div class="pubHeader">
              <div>
                <img src="${pub.foto}" alt="Foto Perfil do ${
          pub.nome
        }" class="imgPerfilPub" />
              </div>
              <div>
                <h3 class="nomePerfilPub">${pub.nome}</h3>
                <h3 class="dataPerfilPub">${pub.dtcadastro}</h3>
              </div>
            </div>
            <div class="pubBody">
              <div class="boxTextoPub">
                <h3 class="textoPub">${pub.texto}</h3>
              </div>
              <a href="${pub.url || "#"}" target="_blank" class="urlPub">
                <img src="${pub.imagem || ""}" alt="" class="imgPub" />
              </a>
            </div>
            <div class="pubFooter">
              <img src="./public/images/favorite.png" alt="Curtir" />
              Curtir
            </div>
          </div>
        `;

        caixaPublicacoes.insertAdjacentHTML("beforeEnd", conteudo);
      });
    })
    .catch((error) => console.error(error));

  // GET AMIGOS

  const caixaAmigos = document.getElementById("amigos");

  fetch("http://localhost:3000/amigos", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      caixaAmigos.innerHTML = "";
      let conteudo = "";

      result.forEach((amg) => {
        conteudo = `
          <div class="amigo">
            <div class="boxImagemAmigo">
              <img src="${amg.foto}" alt="Foto da ${amg.nome}" />
            </div>
            <div class="boxInfoAmigo">
              <p class="nomeAmigo">${amg.nome}</p>
              <p class="emailAmigo">${amg.email}</p>
            </div>
          </div>
        `;

        caixaAmigos.insertAdjacentHTML("beforeEnd", conteudo);
      });
    })
    .catch((error) => console.error(error));

  const buttonPublicacao = document.getElementById("btnPublicar");

  buttonPublicacao.addEventListener("click", () => {
    const ImgPub = document.querySelector("#ImgPub").value;
    const urlPub = document.querySelector("#urlPub").value;
    const txtPub = document.querySelector("#txtPub").value;

    const dados = JSON.stringify({
      nome: "Paulo Souza",
      foto: "https://img.freepik.com/fotos-gratis/retrato-de-menino-branco-com-corte-de-cabelo-estiloso_74855-10319.jpg",
      dtcadastro: getFormattedDate(),
      imagem: ImgPub,
      url: urlPub,
      texto: txtPub,
      curtidas: true,
    });

    cadastrarPublicacao(dados);
  });

  async function cadastrarPublicacao(dados) {
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
        "http://localhost:3000/publicacoes",
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

  function getFormattedDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
});
