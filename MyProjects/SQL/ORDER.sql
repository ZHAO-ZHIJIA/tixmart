CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1) PRIMARY KEY,               -- 🔹 訂單編號（自動遞增，主鍵）
    
    UserID INT NOT NULL,                                 -- 🔹 建立訂單的使用者 ID（外鍵對應 Users 表）
    
    TotalAmount DECIMAL(10, 2) NOT NULL,                 -- 🔹 訂單總金額（小數點後兩位，例如 3600.00）

    PaymentMethod NVARCHAR(50) DEFAULT '未選擇' CHECK (  -- 🔹 付款方式（有五種選擇）
        PaymentMethod IN ('信用卡', 'LINE Pay', '超商代碼', 'ATM 轉帳', '未選擇')
    ),
    
    PaymentStatus NVARCHAR(50) DEFAULT '未付款' CHECK (  -- 🔹 付款狀態（目前未付款、已付款、付款失敗）
        PaymentStatus IN ('未付款', '已付款', '付款失敗')
    ),
    
    OrderTime DATETIME DEFAULT GETDATE(),                -- 🔹 下單時間（自動記錄當前時間）

    -- 🔹 外鍵關聯：UserID 必須來自 Users 表的 UserID 欄位
    CONSTRAINT FK_Orders_Users FOREIGN KEY (UserID)
        REFERENCES Users(UserID)
        ON DELETE CASCADE                                -- 若使用者被刪除，該使用者的所有訂單也會一起刪除
);


CREATE TABLE OrderItems (
    OrderItemID INT IDENTITY(1,1) PRIMARY KEY,   -- 訂單明細項目編號
    OrderID INT NOT NULL,                        -- 所屬訂單 ID
    TicketID INT NOT NULL,                       -- 所購買的票券 ID（關聯到 Tickets 表）
    Quantity INT NOT NULL CHECK (Quantity > 0),  -- 購買數量
    UnitPrice DECIMAL(10,2) NOT NULL,            -- 當下票價（下單當時的價格，避免日後票價變動影響查帳）

    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (TicketID) REFERENCES Tickets(TicketID)
);

CREATE TABLE Tickets (
    TicketID INT IDENTITY(1,1) PRIMARY KEY,       -- 票券ID，自動遞增
    EventName NVARCHAR(255) NOT NULL,             -- 活動名稱（例如：Ado WORLD TOUR）
    EventDate DATETIME NOT NULL,                  -- 活動日期時間
    Venue NVARCHAR(255) NOT NULL,                 -- 場地（例如：台北小巨蛋）
    TicketType NVARCHAR(100) NOT NULL,            -- 票種（例如：VIP、一般席）
    Price DECIMAL(10,2) NOT NULL,                 -- 價格
    Stock INT NOT NULL CHECK (Stock >= 0)         -- 可販售張數（庫存）
);