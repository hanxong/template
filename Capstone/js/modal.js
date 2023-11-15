function openModal(imageSrc, menuName, menuPrice, menuDescription) {
  var modal = document.getElementById("menuModal");
  var modalContent = document.getElementById("modalContent");

  modal.style.display = "block";
  modalContent.innerHTML = `
    <img src="${imageSrc}" />
    <p>${menuName}</p>
    <p class="fw-price">${menuPrice}</p>
    <p class="fw-description">${menuDescription}</p>
   
  `; // 설명

  // "추가" 버튼을 모달 내부에 추가
  var addButton = document.createElement("button");
  addButton.id = "addButton";
  addButton.innerText = "추가";
  modalContent.appendChild(addButton);

  // 닫기 버튼을 모달 내부에 추가
  var closeButton = document.createElement("span");
  closeButton.id = "closeButton";
  closeButton.className = "close-button";
  closeButton.innerText = "X";
  modalContent.appendChild(closeButton);

  // 닫기 버튼에 이벤트 리스너 추가
  closeButton.addEventListener("click", closeModal);
}

// 모달 닫기 함수
function closeModal() {
  var modal = document.getElementById("menuModal");
  modal.style.display = "none";

  // "추가" 버튼과 닫기 버튼을 모달 내부에서 제거
  var addButton = document.getElementById("addButton");
  var closeButton = document.getElementById("closeButton");
  if (addButton) {
    addButton.remove();
  }
  if (closeButton) {
    closeButton.remove();
  }
}

// 각 메뉴 버튼에 이벤트 리스너 추가
var menuButtons = document.querySelectorAll(".menu-button");
menuButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var imageSrc = button.querySelector("img").src;
    var menuName = button.nextElementSibling.textContent;
    var menuPrice = button.nextElementSibling.nextElementSibling.textContent;
    var menuDescription =
      button.nextElementSibling.nextElementSibling.nextElementSibling
        .textContent;
    openModal(imageSrc, menuName, menuPrice, menuDescription);
  });
});
