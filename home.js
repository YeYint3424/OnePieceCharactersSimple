$("#add").click(function () {
  $("#hide").toggleClass("d-none");
});

$("#close").click(function () {
  $("#hide").addClass("d-none");
});

function createCharacterCard(character) {
  const cardTemplate = `
        <div class="card col-xl-4 col-lg-4 col-md-6 col-sm-12 mx-2 mb-4" id="card">
            <div class="card-body">
                <img class="w-100 h-100" src="${character.photo}" alt="" />
            </div>
            <div class="card-footer text-center op-background">
                <div class="edit">
                    <div class="d-flex">
                    <button class="btn btn-info text-light btn-md editButton" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editModal(${character.id})">
                            <i class="fa-solid fa-wrench"></i> Edit
                        </button>
                        <button class="btn btn-danger text-light btn-md deleteButton" data-character-id="${character.id}">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
                <h3>${character.name}</h3>
            </div>
        </div>`;

  $("#characterCards").append(cardTemplate);
}

function showCard() {
  $("#characterCards").html("");
  const characters = JSON.parse(localStorage.getItem("CHA")) || [];
  characters.forEach((character) => {
    createCharacterCard(character);
  });
  bindDeleteEvent();
}
showCard();
function save(list) {
  localStorage.setItem("CHA", JSON.stringify(list));
}
$("#create").click(function () {
  const name = $("#name").val();
  const photo = $("#photo").val();
  let id = crypto.randomUUID();

  if (name === "" || photo === "") {
    return alert("Fill Fully Input");
  }

  const mc = JSON.parse(localStorage.getItem("CHA")) || [];
  mc.push({ id, name, photo });
  save(mc);
  showCard();
  $("#name").val("");
  $("#photo").val("");
  $("#hide").addClass("d-none");
});

function deleteCharacter(id) {
  let localArray = JSON.parse(localStorage.getItem("CHA")) || [];

  const index = localArray.findIndex((character) => character.id === id);

  if (index !== -1) {
    localArray.splice(index, 1);

    localStorage.setItem("CHA", JSON.stringify(localArray));

    console.log(`Character with ID ${id} deleted.`);
    showCard();
  } else {
    console.log(`Character with ID ${id} not found.`);
  }
}

function bindDeleteEvent() {
  $(".deleteButton").click(function () {
    const characterId = this.getAttribute("data-character-id");
    deleteCharacter(characterId);
  });
}
function editModal(id) {
  $(".modal").css("display", "block"); // Corrected this line
  alert(id);
}

// function editModal(id) {
// $(".modal fade").css({
//     display : "block"
// })

// alert(id);
// }

// function updateCharacter(id) {
//     let localArray = JSON.parse(localStorage.getItem("CHA")) || [];

//     const index = localArray.findIndex((character) => character.id === id);
//     if (index !== -1) {
//         localArray.splice(index, 1);

//         localStorage.setItem("CHA", JSON.stringify(localArray));

//         console.log(`Character with ID ${id} deleted.`);
//         showCard();
//       } else {
//         console.log(`Character with ID ${id} not found.`);
//       }
// }
