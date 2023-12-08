// تعریف متغیرهای مورد نیاز
var canvas = document.getElementById("gameCanvas"); // انتخاب المان کانواس
var context = canvas.getContext("2d"); // انتخاب حالت 2 بعدی برای کشیدن
var snake = [{x: 200, y: 200}]; // آرایه‌ای از مختصات بدنه مار
var direction = "right"; // جهت حرکت مار
var food = {x: 300, y: 300}; // مختصات غذا
var score = 0; // امتیاز بازی
var gameOver = false; // پایان بازی

// تابعی برای رسم مار
function drawSnake() {
  context.fillStyle = "green"; // انتخاب رنگ سبز برای مار
  for (var i = 0; i < snake.length; i++) { // حلقه برای رسم هر قسمت از بدنه مار
    context.fillRect(snake[i].x, snake[i].y, 20, 20); // رسم یک مستطیل با اندازه 20 در 20 پیکسل
  }
}

// تابعی برای رسم غذا
function drawFood() {
  context.fillStyle = "red"; // انتخاب رنگ قرمز برای غذا
  context.fillRect(food.x, food.y, 20, 20); // رسم یک مستطیل با اندازه 20 در 20 پیکسل
}

// تابعی برای رسم امتیاز
function drawScore() {
  context.fillStyle = "black"; // انتخاب رنگ سیاه برای متن
  context.font = "20px Arial"; // انتخاب فونت و اندازه متن
  context.fillText("Score: " + score, 10, 30); // نوشتن متن در مختصات 10 و 30
}

// تابعی برای تولید غذا در یک مکان تصادفی
function generateFood() {
  food.x = Math.floor(Math.random() * 25) * 20; // انتخاب یک عدد تصادفی بین 0 تا 24 و ضرب آن در 20
  food.y = Math.floor(Math.random() * 25) * 20; // انتخاب یک عدد تصادفی بین 0 تا 24 و ضرب آن در 20
}

// تابعی برای بررسی برخورد مار با دیوار یا خودش
function checkCollision() {
  // اگر مار از حدود کانواس خارج شود
  if (snake[0].x < 0 || snake[0].x > 480 || snake[0].y < 0 || snake[0].y > 480) {
    gameOver = true; // پایان بازی
  }
  // اگر مار با خودش برخورد کند
  for (var i = 1; i < snake.length; i++) { // حلقه برای بررسی هر قسمت از بدنه مار
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) { // اگر سر مار با یکی از قسمت‌های بدنه مار برابر باشد
      gameOver = true; // پایان بازی
    }
  }
}

// تابعی برای تغییر جهت مار با فشار دادن کلید‌های کنترل
function changeDirection(event) {
  // اگر کلید چپ فشار داده شود و مار به سمت راست نرود
  if (event.keyCode == 37 && direction != "right") {
    direction = "left"; // جهت مار را چپ قرار بده
  }
  // اگر کلید بالا فشار داده شود و مار به سمت پایین نرود
  else if (event.keyCode == 38 && direction != "down") {
    direction = "up"; // جهت مار را بالا قرار بده
  }
  // اگر کلید راست فشار داده شود و مار به سمت چپ نرود
  else if (event.keyCode == 39 && direction != "left") {
    direction = "right"; // جهت مار را راست قرار بده
  }
  // اگر کلید پایین فشار داده شود و مار به سمت بالا نرود
  else if (event.keyCode == 40 && direction != "up") {
    direction = "down"; // جهت مار را پایین قرار بده
  }
}

// تابعی برای به روز رسانی بازی
function update() {
  // اگر بازی تمام شده باشد
  if (gameOver) {
    alert("Game Over!"); // یک پیام نمایش بده
    return; // از تابع خارج شو
  }
  context.clearRect(0, 0, 500, 500); // پاک کردن کانواس
  drawSnake(); // رسم مار
  drawFood(); // رسم غذا
  drawScore(); // رسم امتیاز
  checkCollision(); // بررسی برخورد
  // اگر مار غذا را بخورد
  if (snake[0].x == food.x && snake[0].y == food.y) {
    score++; // امتیاز را یک واحد افزایش بده
    generateFood(); // یک غذا جدید تولید کن
  } else {
    snake.pop(); // آخرین قسمت از بدنه مار را حذف کن
  }
  // بر اساس جهت مار، سر مار را به جلو حرکت بده
  if (direction == "left") {
    snake.unshift({x: snake[0].x - 20, y: snake[0].y});
  } else if (direction == "up") {
    snake.unshift({x: snake[0].x, y: snake[0].y - 20});
  } else if (direction == "right") {
    snake.unshift({x: snake[0].x + 20, y: snake[0].y});
  } else if (direction == "down") {
    snake.unshift({x: snake[0].x, y: snake[0].y + 20});
  }
}

// اضافه کردن یک رویداد برای تغییر جهت مار با فشار دادن کلید‌های کنترل
document.addEventListener("keydown", changeDirection);
// تنظیم یک بازه زمانی برای به روز رسانی بازی هر 100 میلی ثانیه
setInterval(update, 100);

