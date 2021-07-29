using GoldenGuitars.models;
using GoldenGuitars.Repositories;
using GoldenGuitars.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenGuitars.repositories
{
    public class ProjectStepRepository : BaseRepository, IProjectStepRepository
    {
        public ProjectStepRepository(IConfiguration configuration) : base(configuration) { }

        public List<ProjectStep> GetAll(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.id, p.stepsId, p.ProjectId, p.userProfileId, p.statusId FROM ProjectStep p
                    where p.projectId = @Id;
                   ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    var projectStep = new List<ProjectStep>();
                    while (reader.Read())
                    {
                        projectStep.Add(new ProjectStep()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            StepId = DbUtils.GetInt(reader, "StepsId"),
                            ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                            UserProfileId = DbUtils.GetNullableInt(reader, "UserProfileId"),
                            StatusId = DbUtils.GetInt(reader, "StatusId")

                        });

                    }
                    reader.Close();
                    return projectStep;
                }
            }
        }

        public List<ProjectStep> GetAllFromUserByProjectId(int userId, int projectId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.id, p.stepsId, p.ProjectId, p.userProfileId, p.statusId FROM ProjectStep p
                    where p.userProfileId = @userId AND p.ProjectId = @projectId;
                   ";

                    DbUtils.AddParameter(cmd, "@userId", userId);
                    DbUtils.AddParameter(cmd, "@projectId", projectId);

                    var reader = cmd.ExecuteReader();
                    var projectStep = new List<ProjectStep>();
                    while (reader.Read())
                    {
                        projectStep.Add(new ProjectStep()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            StepId = DbUtils.GetInt(reader, "StepsId"),
                            ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                            UserProfileId = DbUtils.GetNullableInt(reader, "UserProfileId"),
                            StatusId = DbUtils.GetInt(reader, "StatusId")

                        });

                    }
                    reader.Close();
                    return projectStep;
                }
            }
        }

        public ProjectStep GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM ProjectStep
                    WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    ProjectStep projectStep = null;
                    if (reader.Read())
                    {
                        projectStep = new ProjectStep()
                        {
                            Id = id,
                            StepId = DbUtils.GetInt(reader, "StepsId"),
                            ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                            UserProfileId = DbUtils.GetNullableInt(reader, "UserProfileId"),
                            StatusId = DbUtils.GetInt(reader, "StatusId")
                        };
                    }
                    reader.Close();

                    return projectStep;
                }
            }
        }

   

        public void Add(ProjectStep projectStep)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO projectStep (StepsId, ProjectId, UserProfileId, StatusId)
                        OUTPUT INSERTED.ID
                        VALUES (@StepsId, @ProjectId, @userProfileId, @StatusId)";

                    DbUtils.AddParameter(cmd, "@StepsId", projectStep.StepId);
                    DbUtils.AddParameter(cmd, "@projectId", projectStep.ProjectId);
                    DbUtils.AddParameter(cmd, "@userProfileId", projectStep.UserProfileId);
                    DbUtils.AddParameter(cmd, "@StatusId", projectStep.StatusId);


                    projectStep.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(ProjectStep projectStep)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE ProjectStep
                               SET StepsId = @StepsId,
                                   ProjectId= @projectId,
                                   userProfileId = @userProfileId,
                                   statusId = @statusId

                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@id", projectStep.Id);

                    DbUtils.AddParameter(cmd, "@StepsId", projectStep.StepId);
                    DbUtils.AddParameter(cmd, "@ProjectId", projectStep.ProjectId);
                    DbUtils.AddParameter(cmd, "@userProfileId", projectStep.UserProfileId);
                    DbUtils.AddParameter(cmd, "@StatusId", projectStep.StatusId);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM ProjectStep WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
