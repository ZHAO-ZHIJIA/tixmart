-- 建立新使用者
INSERT INTO Users (Email, PasswordHash, UserName)
VALUES (
    'newuser2@example.com',
    HASHBYTES('SHA2_256', CONVERT(NVARCHAR(255), 'newpassword')),
    '新用戶2'
);

SELECT UserID FROM Users WHERE Email = 'newuser@example.com';
-- 假設回傳 UserID = 5

-- 建立活動（Events）
INSERT INTO Events (EventName, EventDate, Venue)
VALUES ('Vaundy dome tour 2026 台北場', '2026-02-28 19:30', '台北小巨蛋');

-- 查詢活動 ID
SELECT EventID FROM Events;
-- 假設 EventID = 3

-- 建立票種（Tickets）
INSERT INTO Tickets (EventID, TicketType, Price, Stock)
VALUES 
(3, '一樓站席', 2800, 250),
(3, '二樓坐席A', 3200, 100),
(3, '二樓坐席B', 2800, 100);

-- 加入 一樓站席 票 2 張
INSERT INTO ShoppingCartItems (UserID, TicketName, Quantity, PricePerTicket)
VALUES (5, 'Vaundy dome tour 2026 台北場 - VIP', 2, 2800.00);

--查詢購物車，計算總價
SELECT TicketName, Quantity, PricePerTicket, Quantity * PricePerTicket AS 小計
FROM ShoppingCartItems
WHERE UserID = 5 AND IsCheckedOut = 0;

-- 建立訂單 Orders
INSERT INTO Orders (UserID, TotalAmount, PaymentMethod, PaymentStatus)
VALUES (5, 5600.00, '信用卡', '已付款');

-- 查詢新訂單 ID
SELECT IDENT_CURRENT('Orders') AS NewOrderID;
-- 假設回傳 OrderID = 4

-- 建立訂單明細 OrderItems
-- 假設 TicketID = 4 是 VIP 票
INSERT INTO OrderItems (OrderID, TicketID, Quantity, UnitPrice)
VALUES (4, 4, 2, 2800.00);

-- 減少票券庫存
UPDATE Tickets
SET Stock = Stock - 2
WHERE TicketID = 4;

--標記購物車為已結帳
UPDATE ShoppingCartItems
SET IsCheckedOut = 1
WHERE UserID = 5 AND IsCheckedOut = 0;

-- 查詢訂單總覽
SELECT * FROM Orders WHERE UserID = 5;

-- 查詢該訂單明細
SELECT oi.OrderItemID, t.TicketType, oi.Quantity, oi.UnitPrice
FROM OrderItems oi
JOIN Tickets t ON oi.TicketID = t.TicketID
WHERE oi.OrderID = 4;