/*!
 * Start Bootstrap - Simple Sidebar v6.0.6 (https://startbootstrap.com/template/simple-sidebar)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sb-sidenav-toggled');
    // }
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }
});

//html연동
document.addEventListener("DOMContentLoaded", function () {
  // 클라이언트에서 서버로 데이터를 요청
  fetch("/users/getUsers")
    .then((response) => response.json()) //DB데이터를 json형식으로
    .then((data) => {
      // 데이터를 받아와서 처리
      //data는 서버가 응답한 답
      console.log(data);

      // 여기에서 HTML 엘리먼트에 데이터를 동적으로 추가
      const userListElement = document.getElementById("userList");
      userListElement.style.display = "none";

      // 데이터를 사용하여 HTML 엘리먼트를 동적으로 추가
      data.forEach((menu) => {
        // 메뉴 정보를 담은 HTML 엘리먼트 생성
        const menuElement = document.createElement("div");
        menuElement.innerHTML = `<p>${menu.menu_name_kor}, ${menu.menu_price} ,${menu.menu_description}   </p>`;

        // userListElement에 추가
        userListElement.appendChild(menuElement);
      });

      // 데이터를 사용하여 .menu_name 클래스를 가진 엘리먼트 업데이트
      const menuElements = document.querySelectorAll(".text-name");
      data.forEach((menu, index) => {
        const menuElement = menuElements[index];

        // 메뉴 이름 업데이트
        const nameElement = menuElement.querySelector(".fw-bolder");
        nameElement.textContent = `${menu.menu_name_kor}`;

        // // 메뉴 이미지 업데이트
        // const imgElement = menuElement.querySelector("src");
        // nameElement.textContent = `${메뉴.menu_img}`;

        // 가격 업데이트
        const priceElement = menuElement.querySelector(".fw-price");
        priceElement.textContent = `${menu.menu_price}원`;
        //메뉴 설명 업데이트
        const descriptionElement = menuElement.querySelector(".fw-description");
        descriptionElement.textContent = `${menu.menu_description}`;
      });
    });

  // 초기에 한 번 데이터를 가져오고, 그 후 5초마다 업데이트
  // 5초마다 업데이트 (원하는 주기로 설정)
});

// 모달 열기 함수
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

// order modal

document.addEventListener("DOMContentLoaded", (event) => {
  // 음식 메뉴 배열
  const menuItems = [
    { name: "음식1", price: "10,000원" },
    { name: "음식2", price: "15,000원" },
    // 여러 음식 메뉴 항목을 추가할 수 있습니다.
  ];

  // 주문 모달 열기 함수
  function openOrderModal(orderDetails) {
    var orderModal = document.getElementById("orderModal");
    var orderModalContent = document.getElementById("orderModalContent");

    orderModal.style.display = "block";
    orderModalContent.innerHTML = `
          <p>${orderDetails}</p>
          <!-- 가로 검은색 줄 1 -->
          <hr style="background-color: black; height: 2px; margin: 10px 0;">
          <!-- 메뉴 아이템 목록을 표시할 영역 -->
          <div id="menuItemsContainer"></div>
          <!-- 가로 검은색 줄 2 -->
          <hr style="background-color: black; height: 2px; margin: 10px 0;">
          <div class="modal-1-description"></div>
          <!-- 가로 검은색 줄 3 -->
          <hr style="background-color: black; height: 2px; margin: 10px 0;">
          <!-- 주문하기 버튼 -->
          <button id="addButton" style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);">주문하기</button>
          <span id="closeOrderButton" class="close-button">X</span>
      `;

    // 메뉴 아이템을 동적으로 생성하여 추가
    addMenuItemsToModal();

    // 닫기 버튼에 이벤트 리스너 추가
    var closeOrderButton = document.getElementById("closeOrderButton");
    closeOrderButton.addEventListener("click", closeOrderModal);
  }

  // 메뉴 아이템을 동적으로 생성하여 모달에 추가하는 함수
  function addMenuItemsToModal() {
    const menuItemsContainer = document.getElementById("menuItemsContainer");

    // 음식 메뉴 배열을 순회하며 메뉴 아이템을 생성하여 추가
    menuItems.forEach((menuItem) => {
      const menuItemElement = document.createElement("div");
      menuItemElement.innerHTML = `
              <p>${menuItem.name}</p>
              <p>${menuItem.price}</p>
              <!-- 추가 메뉴 아이템과의 간격을 위한 가로 검은색 줄 -->
              <hr style="background-color: black; height: 2px; margin: 10px 0;">
          `;
      menuItemsContainer.appendChild(menuItemElement);
    });
  }

  // 주문 모달 닫기 함수
  function closeOrderModal() {
    var orderModal = document.getElementById("orderModal");
    orderModal.style.display = "none";
  }

  // 주문 버튼에 이벤트 리스너 추가
  var orderButton = document.getElementById("orderButton");
  orderButton.addEventListener("click", function (event) {
    event.preventDefault(); // 폼 제출 방지
    // 주문 모달 열기 함수 호출
    openOrderModal("주문 내역");
  });
});
