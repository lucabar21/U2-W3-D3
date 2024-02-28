//  Effettuo la richiesta HTTP ad un indirizzo attraverso un URL.
const localStorageCart = "cartKey";
fetch("https://striveschool-api.herokuapp.com/books/")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Spiacente! C'è stato un errore!");
    }
  })
  .then((libraryData) => {
    const container = document.getElementById("row-container");

    libraryData.forEach((book) => {
      // genero i div colonna e ci aggiungo le classi.
      const colDiv = document.createElement("div");
      colDiv.classList.add("col-lg-3", "col-md-6");

      // genero i div card e ci aggiungo le classi.
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");

      // genero le immagini delle card, raggiungo il loro URL e lo insrisco nella loro src.
      const cardImg = document.createElement("img");
      cardImg.classList.add("card-img-top");

      const imgURL = book.img;
      cardImg.src = imgURL;

      // genero i div del body delle card
      const cardBodyDiv = document.createElement("div");
      cardBodyDiv.classList.add("card-body");

      // genero e collego l'H5 della card con i titoli ricevuti dall'API.
      const h5Title = document.createElement("h5");
      h5Title.classList.add("card-title");

      const bookTitle = book.title;
      h5Title.innerText = bookTitle;

      // genero e collego le p della card con i prezzi ricevuti dall'API.
      const pPrice = document.createElement("p");
      pPrice.classList.add("card-text");

      const bookPrice = book.price;
      pPrice.innerText = bookPrice + "€";

      //   genero il div contenitore dei pulsanti.
      const buttonDiv = document.createElement("div");
      buttonDiv.style = "display: flex; justify-content: space-between";

      // genero il secondo pulsante per l'acquisto dei libri.
      const shopButton = document.createElement("a");
      shopButton.classList.add("btn", "btn-primary");
      shopButton.innerText = "Compra ora";

      shopButton.addEventListener("click", (e) => {
        const cart = document.getElementById("cart");
        const liCart = document.createElement("li");
        liCart.style = "list-style-type: none; font-weight: bold; text-align:center";
        liCart.innerText = bookTitle;

        const bin = document.createElement("a");
        bin.innerHTML = '<i class="bi bi-trash"></i>';
        bin.style = "color:red; cursor:pointer";

        bin.addEventListener("click", (e) => {
          if (liCart) {
            cart.removeChild(liCart);
          }
        });

        liCart.appendChild(bin);
        cart.appendChild(liCart);

        // genero un'array dove pusho gli elementi aggiunti con l'onclick e lo "stringifizzo" per farlo leggere al browser.
        const bookList = [];
        cart.querySelectorAll("li").forEach((li) => {
          bookList.push(li.innerText);
        });
        localStorage.setItem(localStorageCart, JSON.stringify(bookList));
      });

      //   genero i pulsanti che a cui darò l'event di eliminare la card.
      const cardButton = document.createElement("a");
      cardButton.classList.add("btn", "btn-danger");
      cardButton.innerText = "Scarta";

      // aggiungo l'evento onclick al pulsante per eliminare la sua card.
      cardButton.addEventListener("click", (e) => {
        if (colDiv) {
          colDiv.removeChild(cardDiv);
        }
      });

      // creo il corretto grado di parentela che volgio dare agli elementi in precedenza creati.
      buttonDiv.appendChild(cardButton);
      buttonDiv.appendChild(shopButton);

      cardBodyDiv.appendChild(h5Title);
      cardBodyDiv.appendChild(pPrice);
      cardBodyDiv.appendChild(buttonDiv);

      cardDiv.appendChild(cardImg);
      cardDiv.appendChild(cardBodyDiv);

      colDiv.appendChild(cardDiv);
      container.appendChild(colDiv);
    });
  })

  .catch((error) => console.log(error));

// rigenero il carrello dal localstorage
const cartSaved = () => {
  const keyStored = localStorage.getItem(localStorageCart);
  const cart = document.getElementById("cart");
  if (keyStored) {
    const keyArray = JSON.parse(keyStored);
    keyArray.forEach((e) => {
      const liCart = document.createElement("li");
      liCart.style = "list-style-type: none; font-weight: bold; text-align:center";
      liCart.innerText = e;

      const bin = document.createElement("a");
      bin.innerHTML = '<i class="bi bi-trash"></i>';
      bin.style = "color:red; cursor:pointer";

      bin.addEventListener("click", (e) => {
        if (liCart) {
          cart.removeChild(liCart);
        }
      });

      liCart.appendChild(bin);
      cart.appendChild(liCart);
    });
  }
};

window.onload = () => {
  cartSaved();
};
