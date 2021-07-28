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
    public class ProjectRepository : BaseRepository, IProjectRepository
    {
        public ProjectRepository(IConfiguration configuration) : base(configuration) { }

        public List<Project> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Name, p.StartDate, p.CompletionDate, steps.name as StepName, s.StepsId, s.ProjectId, s.UserProfileId, s.StatusId
                    From Project p 
                    Left Join Stage s on p.id = s.projectId
                    left Join Steps on s.stepsId =  steps.id ";

                    var reader = cmd.ExecuteReader();
                    var projects = new List<Project>();
                    while (reader.Read())
                    {
                        projects.Add(new Project()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "name"),
                            StartDate = DbUtils.GetDateTime(reader, "startDate"),
                            CompletionDate = DbUtils.GetNullableDateTime(reader, "completionDate"),
                            Steps = new Steps()
                            {
                                Name = DbUtils.GetString(reader, "StepName"),
                            }

                        });

                    }
                    reader.Close();
                    return projects;
                }
            }
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseId, up.Name, up.Email
                               
                          FROM UserProfile up
                               
                         WHERE FirebaseId = @FirebaseId";

                    DbUtils.AddParameter(cmd, "@FirebaseId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email")

                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public Project GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM PROJECT
                                      WHERE ID = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Project project = null;
                    if (reader.Read())
                    {
                        project = new Project()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "name"),
                            StartDate = DbUtils.GetDateTime(reader, "startDate"),
                            CompletionDate = DbUtils.GetNullableDateTime(reader, "completionDate")
                        };
                    }
                    reader.Close();

                    return project;
                }
            }
        }

        public int Add(Project project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Project (Name, StartDate, CompletionDate)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @startDate, @completionDate)";

                    DbUtils.AddParameter(cmd, "@Name", project.Name);
                    DbUtils.AddParameter(cmd, "@StartDate", project.StartDate);
                    DbUtils.AddParameter(cmd, "@CompletionDate", project.CompletionDate);


                    project.Id = (int)cmd.ExecuteScalar();
                    return project.Id;
                }
            }
        }

        public void Update(Project project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Project
                               SET Name = @Name,
                                   StartDate= @startDate,
                                   CompletionDate = @completionDate

                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", project.Name);
                    DbUtils.AddParameter(cmd, "@StartDate", project.StartDate);
                    DbUtils.AddParameter(cmd, "@CompletionDate", project.CompletionDate);


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
                    cmd.CommandText = "DELETE FROM Project WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
