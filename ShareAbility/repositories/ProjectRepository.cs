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
    public class ProjectRepository : BaseRepository
    {
        public ProjectRepository(IConfiguration configuration) : base(configuration) { }

        public List<Project> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM PROJECT";

                    var reader = cmd.ExecuteReader();
                    var projects = new List<Project>();
                    while (reader.Read())
                    {
                        projects.Add(new Project()
                        {
                            id = DbUtils.GetInt(reader, "Id"),
                            name = DbUtils.GetString(reader, "name"),
                            startDate = DbUtils.GetDateTime(reader, "startDate"),
                            completionDate = DbUtils.GetDateTime(reader, "completionDate")

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
                            CompletionDate = DbUtils.GetDateTime(reader, "completionDate")
                        };
                    }
                    reader.Close();

                    return project;
                }    
            }
        }

        public void Add(Project project)
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
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@firebaseId", userProfile.FirebaseId);


                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
