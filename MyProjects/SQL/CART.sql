-- 建立「購物車項目」資料表
CREATE TABLE ShoppingCartItems
(

    -- 購物車項目編號，自動遞增，主鍵
    CartItemID INT IDENTITY(1,1) PRIMARY KEY,

    -- 使用者編號（外鍵，對應 Users 表的 UserID）
    UserID INT NOT NULL,

    -- 票券名稱（例如演唱會名稱、活動名稱）
    TicketName NVARCHAR(255) NOT NULL,

    -- 購買的數量，必須大於 0
    Quantity INT NOT NULL CHECK (Quantity > 0),

    -- 每張票的單價，必須大於等於 0
    PricePerTicket DECIMAL(10, 2) NOT NULL CHECK (PricePerTicket >= 0),

    -- 加入購物車的時間，預設為目前時間
    AddedAt DATETIME DEFAULT GETDATE(),

    -- 是否已結帳（0 = 否，1 = 是），預設為未結帳
    IsCheckedOut BIT DEFAULT 0,

    -- 設定外鍵關聯：UserID 對應到 Users 表的 UserID
    -- 如果該使用者被刪除，連帶刪除該使用者的購物車資料
    CONSTRAINT FK_ShoppingCartItems_Users FOREIGN KEY (UserID)
        REFERENCES Users(UserID)
        ON DELETE CASCADE
);

