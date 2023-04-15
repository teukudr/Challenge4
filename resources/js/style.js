class Component {
  constructor() {
    this.burger = document.getElementById("burger");
    this.section = document.getElementById("main-content");
    this.offcanvas = document.getElementById("offcanvasScrolling");
    this.content = document.getElementById("section-content");
    this.addBtn = document.getElementById("addNewCar");
    this.deleteBtn = document.querySelectorAll(".delete");
    this.yesPrompt = document.querySelector(".ya");
    this.card = document.getElementById("cars");
    this.btnContainer = document.getElementById("sidebar__blue");
    this.btns = this.btnContainer.getElementsByClassName("sidebar--btn");
    this.modal = document.getElementById("exampleModalCenter");
    this.alertz = document.getElementById("alert-success");
    this.updateBtn = document.getElementById("updatecar");
    this.bs = bootstrap.Modal;
  }

  clickBurger() {
    let section = this.section;
    let content = this.content;
    let addBtn = this.addBtn;
    this.burger.addEventListener("click", function () {
      section.classList.toggle("rel--margin__offcanvas");
      section.classList.toggle("rel--margin");
      content.classList.toggle("rel--margin__offcanvas--right");
      addBtn.classList.toggle("rel--margin__offcanvas--right");
    });
  }

  clickCard() {
    let section = this.section;
    let offcanvas = this.offcanvas;
    let content = this.content;
    let addBtn = this.addBtn;
    this.card.addEventListener("click", function () {
      section.classList.toggle("rel--margin__offcanvas");
      section.classList.toggle("rel--margin");
      offcanvas.classList.toggle("show");
      content.classList.toggle("rel--margin__offcanvas--right");
      addBtn.classList.toggle("rel--margin__offcanvas--right");
    });
  }

  activeHover() {
    // Loop through the buttons and add the active class to the current/clicked button
    for (let i = 0; i < this.btns.length; i++) {
      this.btns[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");

        // If there's no active class
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" active", "");
        }

        // Add the active class to the current/clicked button
        this.className += " active";
      });
    }
  }

  bindComponent() {
    //check if element modal is existed or not
    if (this.modal != null) {
      var exampleModal = document.getElementById("exampleModalCenter");
      exampleModal.addEventListener("show.bs.modal", function (event) {
        // Button that triggered the modal
        var button = event.relatedTarget;
        // Extract info from data-bs-* attributes
        var recipient = button.getAttribute("id");
        // If necessary, you could initiate an AJAX request here
        // and then do the updating in a callback.
        // Update the modal's content.
        // Create a class attribute:
        const att = document.createAttribute("id");

        // Set the value of the class attribute:
        att.value = recipient;
        // Add the class attribute to the first h1:
        const yes = exampleModal.querySelector(".ya");
        yes.setAttributeNode(att);
      });
    }
  }

  deleteCar() {
    let bs = this.bs;
    let modalz = this.modal;
    if (this.yesPrompt != null) {
      this.yesPrompt.addEventListener("click", function () {
        let card = document.getElementById(this.getAttribute("id"));
        let xhr = new XMLHttpRequest();
        xhr.open(
          "DELETE",
          `${window.location.protocol}//${
            window.location.host
          }/Car/${this.getAttribute("id")}`,
          true
        );
        xhr.onreadystatechange = function () {
          if (this.status == 200 && this.readyState == 4) {
            console.log(this.response);
            //dismiss modal
            let modal = bs.getInstance(modalz);
            modal.hide();
            //remove deleted card
            card.remove();
            //show alert with message from json response and then dismiss it
            let alert = document.getElementById("alert");
            alert.classList.remove("d-none");
            alert.classList.add("d-block");
            alert.innerHTML = this.response;
            setTimeout(function () {
              alert.classList.remove("d-block");
              alert.classList.add("d-none");
            }, 3000);
          } //end onreadystate
        };
        xhr.send();
      });
    }
  }

  alertify() {
    let alertz = this.alertz;
    //check if element alert success is existed or not
    if (alertz != null) {
      setTimeout(function () {
        alertz.classList.add("d-none");
        //clear query string from url browser
        window.history.pushState({}, document.title, window.location.pathname);
      }, 3000);
    }
  }

  updateCar() {
    //check if element updatecar is existed or not
    if (this.updateBtn != null) {
      this.updateBtn.addEventListener("click", function () {
        try {
          //check if form is valid or not
          document.getElementById("update").checkValidity();
          let xhr = new XMLHttpRequest();
          xhr.open(
            "PUT",
            `${window.location.protocol}//${
              window.location.host
            }/Car/${this.getAttribute("value")}`,
            true
          );
          //send form data
          let form = document.getElementById("update");
          let formData = new FormData(form);
          console.log(formData);
          xhr.send(formData);
          //redirect to home page with success message
          xhr.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == 4) {
              window.location.href = `${window.location.protocol}//${window.location.host}/?success=${this.response}`;
            } else {
              window.location.href = `${window.location.protocol}//${window.location.host}/?message=Gagal mengupdate data, silakan cek kembali jangan sampai ada data yang kosong`;
            }
          };
        } catch (error) {
          console.log(error);
        }
      });
    }
  }

  loadContent() {
    //check if url is home page or not
    if (window.location.pathname == "/") {
    //add event listener to document on load
    let html = "";
    document.addEventListener("DOMContentLoaded", function () {
      //fetch json data from api and set header key insomnia with value string true
      fetch(`${window.location.protocol}//${window.location.host}/`, {
        headers: {
          insomnia: "true",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //loop through json data and set it to html variable
          data.forEach((item) => {
            html += `
            <div class="col my-2 " id=${item.id}>
            <div class="card h-100">
              <img src=${item.photo_mobil} class="card-img-top" alt=${item.name_mobil}>
              <div class="card-body">
                <p class="card-title">${item.name_mobil}</p>
                <h5 class="card-text">${ new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(item.rent_mobil) } / hari</h5>
                <p class="card-text"><small class="text-muted"><i class="bi bi-clock"></i> Updated at ${ new Date(item.updatedAt).toDateString() }</small></p>
                <div class="hstack gap-2">
                <button type="button" class="btn btn-outline-danger w-50 delete" id=${item.id} data-bs-toggle="modal" data-bs-target="#exampleModalCenter"><i class="bi bi-trash"></i> Delete</button>
                <a href="/Car/${item.id}"class="btn btn-success w-50"><i class="bi bi-pencil-square"></i> Edit</a>
              </div>
              </div>
            </div>
          </div>
            `;
          });
          //set html variable to card container
          document.getElementById("section-content").innerHTML = html;
        });
    });
  }
  }

  searchContent(){
    //set html variable to card container
    document.getElementById("isiData").innerHTML = ` <div class="col my-2">
    <div class="card h-100">
      <img class="skeleton h-100 card-img-top">
      <div class="card-body">
        <p class="skeleton card-title"></p>
        <h5 class="skeleton card-text"></h5>
        <p class="skeleton card-text"><small class="skeleton-text text-muted"><i class="bi bi-clock"></i> </small></p>
        <div class="skeleton hstack gap-2">
        <button type="button" class="skeleton" data-bs-toggle="modal" data-bs-target="#exampleModalCenter"><i class="bi bi-trash"></i></button>
        <a class="skeleton"><i class="bi bi-pencil-square"></i> </a>
      </div>
      </div>
    </div>
  </div>`;
    let html = ""
    fetch(`${window.location.protocol}//${window.location.host}/Car/?search=${document.getElementById('cari').value}`)
    .then(response => response.json())
    .then((data) =>{
      if(data.length>0){
        html+=`<div class="row row-cols-1 row-cols-md-3" id="section-content">`
        data.forEach((item) =>{
          html+=`
          <div class="col my-2 " id=${item.id}>
          <div class="card h-100">
            <img src=${item.photo_mobil} class="card-img-top" alt=${item.name_mobil}>
            <div class="card-body">
              <p class="card-title">${item.name_mobil}</p>
              <h5 class="card-text">${ new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(item.rent_mobil) } / hari</h5>
              <p class="card-text"><small class="text-muted"><i class="bi bi-clock"></i> Updated at ${ new Date(item.updatedAt).toDateString() }</small></p>
              <div class="hstack gap-2">
              <button type="button" class="btn btn-outline-danger w-50 delete" id=${item.id} data-bs-toggle="modal" data-bs-target="#exampleModalCenter"><i class="bi bi-trash"></i> Delete</button>
              <a href="/Car/${item.id}"class="btn btn-success w-50"><i class="bi bi-pencil-square"></i> Edit</a>
            </div>
            </div>
          </div>
          </div>
          `;})
          html+=`</div>`
      }else{
        html = `<div class="card w-100 my-3">
        <h1 class="d-block mx-auto py-5">Sorry, data yang kamu cari gak ada</h1>
        </div>`
      }      
      //set html variable to card container
document.getElementById("isiData").innerHTML = html;
    })
        
    }
}
