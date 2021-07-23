USE [master]
GO

IF db_id('GoldenGuitars') IS NOT NULL
BEGIN
  ALTER DATABASE [GoldenGuitars] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [GoldenGuitars]
END
GO

CREATE DATABASE [GoldenGuitars]
GO

USE [GoldenGuitars]
GO

CREATE TABLE [UserProfile] (
  [id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [name] varchar(25) NOT NULL,
  [email] nvarchar(255) NOT NULL,
  [firebaseId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [project] (
  [id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [name] nvarchar(255) NOT NULL,
  [startDate] datetime NOT NULL,
  [completionDate] datetime NULL,
)
GO

CREATE TABLE [inventory] (
  [id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [name] nvarchar(255)NOT NULL,
  [stock] int NOT NULL
) 
GO

CREATE TABLE [stageNotes] (
  [id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [content] nvarchar(max) NOT NULL,
  [userProfileId] int NOT NULL,
  [stageId] int NOT NULL
)
GO

CREATE TABLE [stage] (
  [id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [name] varchar(255) NOT NULL,
  [projectId] int NOT NULL,
  [userProfileId] int NULL,
  [statusId] int Not NULL
)
GO

CREATE TABLE [status] (
  [id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [soldProjects] (
  [id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [projectId] int NOT NULL,
  [clientName] nvarchar(255) NOT NULL,
  [clientEmail] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [projectNotes] (
  [id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [content] nvarchar(255) NOT NULL,
  [projectId] int NOT NULL
)
GO


ALTER TABLE [stage] ADD FOREIGN KEY ([userProfileId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [stage] ADD FOREIGN KEY ([statusId]) REFERENCES [status] ([id])
GO

ALTER TABLE [projectNotes] ADD FOREIGN KEY ([projectId]) REFERENCES [project] ([id])
GO

ALTER TABLE [stageNotes] ADD FOREIGN KEY ([stageId]) REFERENCES [stageNotes] ([id])
GO

ALTER TABLE [stageNotes] ADD FOREIGN KEY ([UserProfileid]) REFERENCES [userProfile] ([id])
GO

ALTER TABLE [soldProjects] ADD FOREIGN KEY ([projectId]) REFERENCES [project] ([id])
GO


SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
	([id], [name], [email], [firebaseId])
VALUES
	(1, 'B.J. Golden', 'bj@gg.com', 'Ns56YyCmyMcQXAnslM6jLY6zqst2'),
	(2, 'Eric Breish', 'eric@gg.com', 'du8HMWPqxXS4kRP7r0smaJDEXr53'),
	(3, 'Jared Peterman', 'jared@gg.com', '7ooZX42H7UWeNZMxORXVtqE5Jlu2')
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [project] ON
INSERT INTO [project]
	([id], [name], [startDate], [completionDate])
VALUES
	(1, 'Blue Dream', 2020/10/25, null)
SET IDENTITY_INSERT [project] OFF

SET IDENTITY_INSERT [status] ON
INSERT INTO [status]
	([id], [name])
VALUES
	(1, 'Not Started'),
	(2, 'In Progress'),
	(3, 'Complete')
SET IDENTITY_INSERT [status] OFF

SET IDENTITY_INSERT [stage] ON
INSERT INTO [stage]
	([id], [name], [projectId], [userProfileId], [statusId])
VALUES
	(1, 'Wood preparation, routing, drilling', 1, null, 1 ),
	(2, 'Finishing',  1, null, 1 ),
	(3, 'Setup and assembly',  1, null, 1 ),
	(4, 'final testing',  1, null, 1 ),
	(5, 'metal scoring and painting',  1, null, 1 ),
	(6, 'Post installation and final assembly',  1, null, 1 )
SET IDENTITY_INSERT [stage] OFF