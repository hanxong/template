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
document.addEventListener("DOMContentLoaded", (event) => {
  function openModal(imageSrc, menuName, menuPrice, menuDescription) {
    var modal = document.getElementById("menuModal");
    var modalContent = document.getElementById("modalContent");

    modal.style.display = "block";
    modalContent.innerHTML = `
      <img src="${imageSrc}" /></img>
      <p class="fw-name">${menuName}</p>
      <p class="fw-price">${menuPrice}</p>
      <p class="fw-description">${menuDescription}</p>
     
    `; // 설명

    // "추가" 버튼을 모달 내부에 추가
    var menuaddButton = document.createElement("button");
    menuaddButton.id = "menuaddButton";
    menuaddButton.innerText = "추가";
    modalContent.appendChild(menuaddButton);
    menuaddButton.onclick = goBasket();

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
    var menuaddButton = document.getElementById("menuaddButton");
    var closeButton = document.getElementById("closeButton");
    if (menuaddButton) {
      menuaddButton.remove();
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
});

// basket modal
// DOMContentLoaded 이벤트가 발생하면 실행되는 함수
document.addEventListener("DOMContentLoaded", function () {
  // 장바구니 버튼, 모달, 모달 닫기 버튼, 장바구니에서 제품 제거 아이콘을 가져옴
  var basketButton = document.getElementById("basketButton");
  var basketModal = document.getElementById("basketModal");
  var closeBasketButton = document.getElementById("closeBasketButton");
  var icon = document.querySelector(".basket-remove");

  // "장바구니" 버튼 클릭 시 모달 표시
  basketButton.addEventListener("click", function () {
    basketModal.style.display = "block";
  });

  // 모달 내 "X" 버튼 클릭 시 모달 숨김
  closeBasketButton.addEventListener("click", function () {
    basketModal.style.display = "none";
  });
});

// 페이지 로딩이 완료되면 실행되는 함수
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// 장바구니에서 제품 제거 아이콘이 있는 모든 버튼에 이벤트 리스너를 추가
function ready() {
  var removeBasketButton = document.getElementsByClassName("basket-remove");
  console.log(removeBasketButton);
  // "basket-remove" 클래스를 가진 모든 요소에 대해 반복
  for (var i = 0; i < removeBasketButton.length; i++) {
    // 현재 반복 중인 요소를 가져옴
    var button = removeBasketButton[i];

    // 각 버튼에 이벤트 리스너를 추가
    button.addEventListener("click", removeBasketItem);
  }
  //
  var quantityInputs = document.getElementsByClassName("basket-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //
  var addBasket = document.querySelector("menuaddButton");
  for (var i = 0; i < addBasket.length; i++) {
    var button = addBasket[i];
    butt;
    on.addEventListener("click", addBasketClicked);
  }
}

// 장바구니에서 제품을 제거하는 함수
function removeBasketItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

//quntity change
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

function goBasket(event) {
  const buttonAction = document.getElementById("modalContent");
  console.log(buttonAction);
  const productname =
    buttonAction.getElementsByClassName("fw-name")[0].innerText;
  const price = buttonAction.getElementsByClassName("fw-price")[0].innerText;
  const description =
    buttonAction.getElementsByClassName("fw-description")[0].innerText;
  const productImg = buttonAction.querySelector("img").src;
  console.log(productname, price, productImg, description);
  addProductTobasket(productname, price, productImg, description);
  updatetotal();
}

//
function addProductTobasket(productname, price, productImg, description) {
  var basketShopBox = document.createElement("div");
  basketShopBox.classList.add("basket-box");
  var basketItems = document.getElementsByClassName("modal-basket-content")[0];
  var basketItemsNames = basketItems.getElementsByClassName("basket-menu-name");
  for (var i = 0; i < basketItemsNames.length; i++) {
    if (basketItemsNames[i].innerText == productname) {
      alert("장바구니에 담기");

      return;
    }
  }

  var basketBoxContent = `

<div class="detail-box">

<img src="${productImg}" alt="" class="basket-img">
<div class="basket-menu-name">${productname}</div>
<div class="basket-menu-price">${price}</div>
<input type="number" value="1" class="basket-quantity">

<!-- 메뉴 삭제 -->
<i class="bi bi-trash3-fill basket-remove"></i>
</div>`;
  basketShopBox.innerHTML = basketBoxContent;
  basketItems.append(basketShopBox);

  basketShopBox
    .getElementsByClassName("basket-remove")[0]
    .addEventListener("click", removeBasketItem);

  basketShopBox
    .getElementsByClassName("basket-quantity")[0]
    .addEventListener("change", quantityChanged);
}

//업데이트 총액
function updatetotal() {
  var basketContent = document.getElementsByClassName(
    "modal-basket-content"
  )[0];
  var basketBoxes = basketContent.getElementsByClassName("basket-box");

  var total = 0;
  for (var i = 0; i < basketBoxes.length; i++) {
    var basketBox = basketBoxes[i];
    var priceElement = basketBox.getElementsByClassName("basket-menu-price")[0];
    var quantityElement =
      basketBox.getElementsByClassName("basket-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("원", ""));
    var quantity = quantityElement.value;
    total += price * quantity;
    //
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = total + "원";
  }
}
