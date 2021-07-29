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

CREATE TABLE [projectStepNotes] (
  [id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [content] nvarchar(max) NOT NULL,
  [userProfileId] int NOT NULL,
  [stepId] int NOT NULL

)
GO

CREATE TABLE [projectNotes] (
  [id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [content] nvarchar(max) NOT NULL,
  [projectId] int NOT NULL,
  [userProfileId] int NOT NULL
)
GO

CREATE TABLE [projectStep] (
  [id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [stepId] INT NOT NULL,
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


CREATE TABLE [dbo].[steps] (
    [id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
    [name] NVARCHAR (255) NOT NULL
);





ALTER TABLE [projectStep] ADD FOREIGN KEY ([userProfileId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [projectStep] ADD FOREIGN KEY ([statusId]) REFERENCES [status] ([id])
GO

ALTER TABLE [projectStep] ADD FOREIGN KEY ([stepId]) REFERENCES [steps] ([id])
GO

ALTER TABLE [projectNotes] ADD FOREIGN KEY ([projectId]) REFERENCES [project] ([id])
GO

ALTER TABLE [projectStepNotes] ADD FOREIGN KEY ([stepId]) REFERENCES [projectStepNotes] ([id])
GO

ALTER TABLE [projectStepNotes] ADD FOREIGN KEY ([UserProfileid]) REFERENCES [userProfile] ([id])
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

SET IDENTITY_INSERT [status] ON
INSERT INTO [status]
	([id], [name])
VALUES
	(1, 'Not Started'),
	(2, 'In Progress'),
	(3, 'Complete')
SET IDENTITY_INSERT [status] OFF

SET IDENTITY_INSERT [steps] ON
INSERT INTO [steps]
	([id], [name])
VALUES
	(1, 'Wood preparation, Routing, Drilling' ),
	(2, 'Finishing'),
	(3, 'Setup and Assembly'),
	(4, 'Final Testing'),
	(5, 'Metal Scoring and Painting'),
	(6, 'Post Installation and Final Assembly')
SET IDENTITY_INSERT [steps] OFF