CREATE TABLE Events (
    EventID INT IDENTITY(1,1) PRIMARY KEY,
    EventName NVARCHAR(255) NOT NULL,
    EventDate DATETIME NOT NULL,
    Venue NVARCHAR(255) NOT NULL
);


CREATE TABLE Tickets (
    TicketID INT IDENTITY(1,1) PRIMARY KEY,
    EventID INT NOT NULL,
    TicketType NVARCHAR(50) NOT NULL,      -- 普通票 / VIP / 搖滾區等
    Price DECIMAL(10,2) NOT NULL CHECK (Price >= 0),
    Stock INT NOT NULL CHECK (Stock >= 0),

    CONSTRAINT FK_Tickets_Events FOREIGN KEY (EventID)
        REFERENCES Events(EventID)
        ON DELETE CASCADE
);


-- 插入一筆活動
INSERT INTO Events (EventName, EventDate, Venue)
VALUES ('Ado WORLD TOUR 2025 台北場', '2025-5-11 20:00', '林口體育館');

-- 假設這筆活動是 EventID = 1

-- 插入票種資料
INSERT INTO Tickets (EventID, TicketType, Price, Stock)
VALUES 
(1, '一樓站席', 2800, 100),
(1, '二樓坐席A', 3200, 50),
(1, '二樓坐席B', 2800, 30);