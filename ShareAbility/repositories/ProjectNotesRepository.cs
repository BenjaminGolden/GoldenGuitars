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
    public class ProjectNotesRepository : BaseRepository, IProjectNotesRepository
    {
        public ProjectNotesRepository(IConfiguration configuration) : base(configuration) { }

        public List<ProjectNotes> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM ProjectNotes
                   ";

                    //DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    var projectNotes = new List<ProjectNotes>();
                    while (reader.Read())
                    {
                        projectNotes.Add(new ProjectNotes()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Content = DbUtils.GetString(reader, "content"),
                            ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId")

                        });

                    }
                    reader.Close();
                    return projectNotes;
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

        public ProjectNotes GetByProjectId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT pn.id as noteId, pn.content, pn.userProfileId as UserId, pn.projectId as projectId, p.name as ProjectName FROM ProjectNotes pn
                    Left Join Project p on pn.projectId = p.Id
                    WHERE p.id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    ProjectNotes projectNote = null;
                    if (reader.Read())
                    {
                        projectNote = new ProjectNotes()
                        {
                            Id = id,
                            Content = DbUtils.GetString(reader, "content"),
                            ProjectId = DbUtils.GetInt(reader, "projectId"),
                            UserProfileId = DbUtils.GetInt(reader, "userId")
                        };
                    }
                    reader.Close();

                    return projectNote;
                }
            }
        }

        public void Add(ProjectNotes projectNote)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ProjectNotes (Content, ProjectId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@Content, @ProjectId, @userProfileId)";

                    DbUtils.AddParameter(cmd, "@Content", projectNote.Content);
                    DbUtils.AddParameter(cmd, "@projectId", projectNote.ProjectId);
                    DbUtils.AddParameter(cmd, "@userProfileId", projectNote.UserProfileId);


                    projectNote.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(ProjectNotes projectNote)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE ProjectNotes
                               SET Content = @Content,
                                   ProjectId= @projectId,
                                   userProfileId = @completionDate

                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Content", projectNote.Content);
                    DbUtils.AddParameter(cmd, "@ProjectId", projectNote.ProjectId);
                    DbUtils.AddParameter(cmd, "@userProfileId", projectNote.UserProfileId);


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
                    cmd.CommandText = "DELETE FROM ProjectNotes WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
