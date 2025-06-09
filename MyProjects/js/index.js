// ✅ 外層函式（要讓 HTML 的 onclick 可以使用）
function updateFormMode() {
  const title = document.getElementById('popupTitle').textContent.trim();
  const verifyBtn = document.getElementById('verifyBtn');
  const forgotBtn = document.getElementById('forgotPasswordBtn');

  if (title === '註冊') {
    verifyBtn.style.display = 'inline-block';
    forgotBtn.style.display = 'none';
  } else {
    verifyBtn.style.display = 'none';
    forgotBtn.style.display = 'inline-block';
  }
}

function openPopup(mode) {
  const overlay = document.getElementById('overlay');
  const title = document.getElementById('popupTitle');
  const confirmGroup = document.getElementById('confirmPasswordGroup');
  const nameGroup = document.getElementById('nameGroup');
  const phoneGroup = document.getElementById('phoneGroup');

  overlay.style.display = 'flex';

  if (mode === 'login') {
    title.textContent = '登入';
    confirmGroup.classList.add('d-none');
    nameGroup.classList.add('d-none');
    phoneGroup.classList.add('d-none');
  } else {
    title.textContent = '註冊';
    confirmGroup.classList.remove('d-none');
    nameGroup.classList.remove('d-none');
    phoneGroup.classList.remove('d-none');
  }

  updateFormMode();
}

function closePopup() {
  document.getElementById('overlay').style.display = 'none';
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

// ✅ 當 DOM 準備好，綁定事件
document.addEventListener("DOMContentLoaded", function () {
  // ✅ 遮罩點擊關閉
  document.getElementById('overlay').addEventListener('click', function (e) {
    if (e.target === this) {
      closePopup();
    }
  });

  // ✅ 驗證信箱
  document.getElementById('verifyBtn').addEventListener('click', () => {
    const email = document.getElementById('emailInput').value.trim();
    if (!email) {
      alert('請先輸入信箱');
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (emailRegex.test(email)) {
      alert('信箱格式正確，可以進行驗證');
    } else {
      alert('信箱格式不正確，請重新輸入');
    }
  });

  // ✅ 忘記密碼
  document.getElementById('forgotPasswordBtn').addEventListener('click', () => {
    alert('請聯絡客服或輸入信箱進行重設');
  });

  // ✅ 導覽列 active
  const links = document.querySelectorAll('.navbar-nav .nav-link');
  const currentPath = window.location.pathname.split('/').pop();
  links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // ✅ 更新購物車徽章
  updateCartBadge();
});


//彈出式頁面
document.addEventListener('DOMContentLoaded', function () {
  const myModal = new bootstrap.Modal(document.getElementById('mainNoticeModal'));
  myModal.show();
});

// 滾動跑馬燈

  const wrapper = document.querySelector('.marquee-wrapper');
  const items = document.querySelectorAll('.marquee-item');
  const itemHeight = 40;
  const totalItems = items.length;

  let index = 0;

  setInterval(() => {
    index++;
  wrapper.style.transform = `translateY(-${itemHeight * index}px)`;

  if (index === totalItems - 1) {
    // 到達複製那條（最後一條），準備跳回原始第一條
    setTimeout(() => {
      wrapper.style.transition = 'none'; // 移除動畫
      wrapper.style.transform = 'translateY(0)';
      index = 0;

      // 強制重繪再恢復 transition，避免動畫跳動
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          wrapper.style.transition = 'transform 0.5s ease-in-out';
        });
      });
    }, 500); // 等待動畫結束再重置
    }
  }, 2000); // 每條訊息顯示時間（含動畫時間）

  
