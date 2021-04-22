"use strict";

function generateLetters() {
  let result = [];
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toUpperCase();
  let charactersLength = letters.length;

  while (result.length < 5) {
    let random = letters.charAt(Math.floor(Math.random() * charactersLength));

    result.push(random);

    result = [...new Set(result)];
  }

  console.log(result);

  let wrapper = document.querySelector(".wrapper");

  let selectTag = document.createElement("select");



  selectTag.classList.add("select-list");

  selectTag.innerHTML = `
    <option selected disabled >Choose a letter</option>
    <option value="${result[0]}">${result[0]}</option>
    <option value="${result[1]}">${result[1]}</option>
    <option value="${result[2]}">${result[2]}</option>
    <option value="${result[3]}">${result[3]}</option>
    <option value="${result[4]}">${result[4]}</option>`;

  wrapper.appendChild(selectTag);
}
generateLetters();

function generateList() {
  let nameFiltered = [];

  let getSelect = document.querySelector(".select-list");

  let ulTag = document.querySelector(".list");

  fetch("db/list.json")
    .then((response) => response.json())
    .then((data) => {
      getSelect.addEventListener("change", () => {
        nameFiltered = [];
        ulTag.innerHTML = ` `;

        for (let i = 0; i < data.length; i++) {
          if (getSelect.value === data[i].name.slice(0, 1)) {
            nameFiltered.push(data[i].name);

            nameFiltered = [...new Set(nameFiltered)];
          }
        }

        if (nameFiltered.length === 0) {
          alert(`No matches with letter "${getSelect.value}"`);
        }

        nameFiltered.forEach((item, i) => {
          ulTag.innerHTML += `<p>${i + 1}. ${item}</p>`;
        });
      });
    });
}
generateList();

