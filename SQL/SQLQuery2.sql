

CREATE TABLE [steps] (
  [id] INTEGER PRIMARY KEY IDENTITY NOT NULL,
  [name] nvarchar(255) NOT NULL
)
GO


ALTER TABLE [ProjectStep] ADD FOREIGN KEY ([stepsId]) REFERENCES [steps] ([id])
GO

SET IDENTITY_INSERT [steps] ON
INSERT INTO [steps]
	([id], [name])
VALUES
	(1, 'Wood preparation, routing, drilling'),
	(2, 'Finishing'),
	(3, 'Setup and assembly'),
	(4, 'final testing'),
	(5, 'metal scoring and painting'),
	(6, 'Post installation and final assembly')
SET IDENTITY_INSERT [steps] OFF

SELECT p.Id, p.Name, p.StartDate, p.CompletionDate, steps.name as StepName, s.StepsId, s.ProjectId, s.UserProfileId, s.StatusId
From Project p 
Left Join ProjectStep s on p.id = s.projectId
left Join Steps on s.stepsId =  steps.id 