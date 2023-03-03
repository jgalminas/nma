CREATE DATABASE COMP2003
GO
USE COMP2003

CREATE TABLE Location (
    LocationId INT PRIMARY KEY IDENTITY(1,1),
    Country VARCHAR(63),
    City VARCHAR(63),
    LocationName VARCHAR(127)
)

CREATE TABLE Event (
    EventId INT PRIMARY KEY IDENTITY(1,1),
    LocationId INT FOREIGN KEY REFERENCES Location(LocationId),
    EventName NVARCHAR(95),
    Notes NVARCHAR(1023),
    StartTime DATETIME,
    FinishTime DATETIME
)

CREATE TABLE Drawing (
    DrawingId INT PRIMARY KEY IDENTITY(1,1),
    EventId INT FOREIGN KEY REFERENCES Event(EventId),
    CreatedAt DATETIME DEFAULT GETDATE(),
    DrawersAge INT,
    FileId VARCHAR(99),
    FileName UNIQUEIDENTIFIER,
    FileExt VARCHAR(4),
    DrawersName NVARCHAR(49)
)

CREATE TABLE Scorer (
    ScorerId INT PRIMARY KEY IDENTITY(1,1),
    Username VARCHAR(63)
)

CREATE TABLE Score (
    ScoreId INT PRIMARY KEY IDENTITY(1,1),
    DrawingId INT FOREIGN KEY REFERENCES Drawing(DrawingId),
    ScorerId INT FOREIGN KEY REFERENCES Scorer(ScorerId),
    ScoredAt DATETIME DEFAULT GETDATE(),
    Notes NVARCHAR(255)
)

CREATE TABLE Topic (
    TopicId INT PRIMARY KEY IDENTITY(1,1),
    TopicName NVARCHAR(63)
)

CREATE TABLE TopicScores (
    TopicScoreId INT PRIMARY KEY IDENTITY(1,1),
    ScoreId INT FOREIGN KEY REFERENCES Score(ScoreId),
    TopicId INT FOREIGN KEY REFERENCES Topic(TopicId),
    Depth INT,
    Extent INT
)

GO

INSERT INTO Location(LocationName, City, Country)
VALUES
('Location 1', 'City', 'Country'),
('Location 1', 'City', 'Country'),
('Location 1', 'City', 'Country')

INSERT INTO Event(LocationId, EventName, Notes)
VALUES
(1, 'Event 1', 'Event notes'),
(2, 'Event 2', 'Event notes'),
(3, 'Event 3', 'Event notes')

INSERT INTO Scorer(Username)
VALUES
('Scorer 1'),
('Scorer 2'),
('Scorer 3')

INSERT INTO Topic(TopicName)
VALUES
('Topic 1'),
('Topic 2'),
('Topic 3')