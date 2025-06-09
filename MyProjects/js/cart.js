// cart.js

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

document.getElementById('overlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closePopup();
    }
});

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

document.getElementById('forgotPasswordBtn').addEventListener('click', () => {
    alert('請聯絡客服或輸入信箱進行重設');
});

const links = document.querySelectorAll('.navbar-nav .nav-link');
const currentPath = window.location.pathname.split('/').pop();
links.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
        link.classList.add('active');
    }
});

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    let total = 0;

    function renderCart() {
        cartContainer.innerHTML = "";
        total = 0;

        if (cartItems.length === 0) {
            cartContainer.innerHTML = "<p>購物車是空的。</p>";
            cartTotal.textContent = "NT$0";
            updateCartBadge();
            return;
        }

        cartItems.forEach((item, index) => {
            const priceNumber = Number(item.price.replace(/[^\d]/g, ""));
            total += priceNumber;

            const card = document.createElement('div');
            card.className = "card mb-3 position-relative";

            card.innerHTML = `
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div style="flex: 2;">
                        <h5 class="card-title mb-1">${item.eventName || "無活動名稱"}</h5>
                        <small class="text-muted">${item.date}</small>
                    </div>
                    <div style="flex: 1;">
                        <p class="card-text mb-0">${item.type} x ${item.qty} 張</p>
                    </div>
                    <div style="flex: 1;">
                        <p class="card-text fw-bold text-success mb-0">${item.price}</p>
                    </div>
                    <button class="btn btn-link text-danger position-absolute top-0 end-0 m-2 p-0 delete-btn" data-index="${index}" title="刪除此項目">
                        <i class="fas fa-xmark fa-lg"></i>
                    </button>
                </div>
            `;

            cartContainer.appendChild(card);
        });

        cartTotal.textContent = `NT$${total.toLocaleString()}`;
        updateCartBadge();
    }

    cartContainer.addEventListener("click", function (e) {
        if (e.target.closest(".delete-btn")) {
            const index = e.target.closest(".delete-btn").dataset.index;
            cartItems.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            renderCart();
        }
    });

    renderCart();
    updateCartBadge();
});

document.getElementById('clearCartBtn').addEventListener('click', function () {
    if (confirm("確定要清空購物車嗎？")) {
        localStorage.removeItem('cart');
        updateCartBadge();
        document.getElementById('cartItems').innerHTML = "<p>購物車是空的。</p>";
        document.getElementById('cartTotal').textContent = "NT$0";
        document.getElementById('clearCartBtn').style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", updateCartBadge);
