CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    UserName NVARCHAR(100),
    CreatedAt DATETIME DEFAULT GETDATE()
);

INSERT INTO Users (Email, PasswordHash, UserName)
VALUES (
    'user@example.com',
    HASHBYTES('SHA2_256', CONVERT(NVARCHAR(255), 'userpassword')),  -- 對 NVARCHAR 做雜湊
    'UserName'
);

SELECT * FROM Users
WHERE Email = 'user@example.com' 
  AND PasswordHash = HASHBYTES('SHA2_256', CONVERT(NVARCHAR(255), 'userpassword'));