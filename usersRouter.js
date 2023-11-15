const express = require("express");
const userDBC = require("./usersDBC");
const router = express.Router();

router.get("/getUsers", async (req, res) => {
  try {
    const users = await userDBC.getUsers(); // 데이터베이스에서 사용자 데이터를 가져옵니다.

    if (users.length > 0) {
      // 사용자 데이터가 존재하는 경우
      const userArray = users.map((menu) => ({
        menu_name_kor: menu.menu_name_kor,
        menu_description: menu.menu_description,
        menu_price: menu.menu_price,
        category_title: menu.category_title,
      }));

      // JSON 형식으로 응답을 클라이언트에게 보냅니다.
      res.status(200).json(userArray);
    } else {
      // 사용자 데이터가 없는 경우
      res.status(404).json({ message: "사용자 없음" });
    }
  } catch (error) {
    // 오류가 발생한 경우
    console.log(error.message);
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
