document.addEventListener("DOMContentLoaded", function () {
    // === 彈窗相關 ===
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

    window.openPopup = function (mode) {
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
    };

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

    // === 購票邏輯 ===
    const dateButtons = document.querySelectorAll('.date-btn');
    const purchaseDetails = document.getElementById('purchaseDetails');
    const selectedDateTitle = document.getElementById('selectedDateTitle');
    const ticketTypeSelect = document.getElementById('ticketType');
    const ticketQtyInput = document.getElementById('ticketQty');
    const subtotalDiv = document.getElementById('subtotal');
    const ticketForm = document.getElementById('ticketForm');

    let selectedDateButton = null;

    function updateSubtotal() {
        if (!selectedDateButton) {
            subtotalDiv.textContent = 'NT$0';
            return;
        }
        const ticketType = ticketTypeSelect.value;
        const qty = Number(ticketQtyInput.value || 0);

        if (!ticketType || qty <= 0) {
            subtotalDiv.textContent = 'NT$0';
            return;
        }

        let price = 0;
        if (ticketType === 'floor') {
            price = Number(selectedDateButton.dataset.floorPrice);
        } else if (ticketType === 'seatA') {
            price = Number(selectedDateButton.dataset.seataPrice);
        } else if (ticketType === 'seatB') {
            price = Number(selectedDateButton.dataset.seatbPrice);
        }

        const total = price * qty;
        subtotalDiv.textContent = `NT$${total.toLocaleString()}`;
    }

    dateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (selectedDateButton) {
                selectedDateButton.classList.remove('btn-primary');
                selectedDateButton.classList.add('btn-outline-primary');
            }
            btn.classList.add('btn-primary');
            btn.classList.remove('btn-outline-primary');
            selectedDateButton = btn;

            purchaseDetails.style.display = 'block';
            selectedDateTitle.textContent = `購買日期：${btn.textContent}`;
            ticketTypeSelect.value = '';
            ticketQtyInput.value = 1;
            updateSubtotal();
        });
    });

    ticketTypeSelect.addEventListener('change', updateSubtotal);
    ticketQtyInput.addEventListener('input', updateSubtotal);

    ticketForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const qty = ticketQtyInput.value;
        const ticketType = ticketTypeSelect.value;
        const subtotal = subtotalDiv.textContent;
        const eventName = document.getElementById('eventName').textContent.trim();

        alert(`您選擇了 ${qty} 張 ${ticketTypeSelect.selectedOptions[0].textContent}，活動日期為 ${selectedDateButton.textContent}，總計 ${subtotal}`);

        const cartItem = {
            eventName: eventName,
            date: selectedDateButton.textContent,
            type: ticketTypeSelect.selectedOptions[0].textContent,
            price: subtotal,
            qty: qty
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartBadge();
        alert("已加入購物車！可前往查看");
    });

    // === 購物車徽章 ===
    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
        }
    }

    updateCartBadge();
});
