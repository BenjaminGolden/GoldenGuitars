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
    public class ProjectStepNotesRepository : BaseRepository, IProjectStepNotesRepository
    {
        public ProjectStepNotesRepository(IConfiguration configuration) : base(configuration) { }

        public List<ProjectStepNotes> GetAllNotesByStepId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT sn.id, sn.content, sn.userProfileId, sn.stepId, up.name, p.name as Project, p.id as ProjectId   FROM ProjectStepNotes sn               
                        Left Join ProjectStep ps on sn.stepid = ps.stepId
                        Left join UserProfile up on sn.userProfileId = up.id
                        left Join Project p on ps.projectId = p.id
                        WHERE sn.stepId = @stepId";

                    DbUtils.AddParameter(cmd, "@stepId", id);
                    ;

                    var reader = cmd.ExecuteReader();
                    var ProjectStepNotes = new List<ProjectStepNotes>();
                    while (reader.Read())
                    {
                        ProjectStepNotes.Add(new ProjectStepNotes()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Content = DbUtils.GetString(reader, "content"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            StepId = DbUtils.GetInt(reader, "StepId"),
                           UserProfile = new UserProfile()
                           {
                            Name = DbUtils.GetString(reader, "Name")
                           },
                           Project = new Project()
                           {
                               Id = DbUtils.GetInt(reader, "projectId"),
                               Name = DbUtils.GetString(reader, "Project")
                           }
                       
                           
                        });

                    }
                    reader.Close();
                    return ProjectStepNotes;
                }
            }
        }

        //public UserProfile GetByFirebaseUserId(string firebaseUserId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                SELECT up.Id, Up.FirebaseId, up.Name, up.Email

        //                  FROM UserProfile up

        //                 WHERE FirebaseId = @FirebaseId";

        //            DbUtils.AddParameter(cmd, "@FirebaseId", firebaseUserId);

        //            UserProfile userProfile = null;

        //            var reader = cmd.ExecuteReader();
        //            if (reader.Read())
        //            {
        //                userProfile = new UserProfile()
        //                {
        //                    Id = DbUtils.GetInt(reader, "Id"),
        //                    FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
        //                    Name = DbUtils.GetString(reader, "Name"),
        //                    Email = DbUtils.GetString(reader, "Email")

        //                };
        //            }
        //            reader.Close();

        //            return userProfile;
        //        }
        //    }
        //}

        public ProjectStepNotes GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT content, userProfileId, stepId FROM ProjectStepNotes
                    WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    ProjectStepNotes ProjectStepNote = null;
                    if (reader.Read())
                    {
                        ProjectStepNote = new ProjectStepNotes()
                        {
                            Id = id,
                            Content = DbUtils.GetString(reader, "content"),
                            UserProfileId = DbUtils.GetInt(reader, "userProfileId"),
                            StepId = DbUtils.GetInt(reader, "StepId"),
                        };
                    }
                    reader.Close();

                    return ProjectStepNote;
                }
            }
        }

        public void Add(ProjectStepNotes ProjectStepNotes)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO ProjectStepNotes (Content, UserProfileId, stepId)
                    OUTPUT INSERTED.ID
                    VALUES (@Content, @userProfileId, @stepId)";

                    DbUtils.AddParameter(cmd, "@Content", ProjectStepNotes.Content);
                    DbUtils.AddParameter(cmd, "@stepId", ProjectStepNotes.StepId);
                    DbUtils.AddParameter(cmd, "@userProfileId", ProjectStepNotes.UserProfileId);
                    


                    ProjectStepNotes.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(ProjectStepNotes projectStepNote)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE ProjectStepNotes
                               SET Content = @Content
                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Content", projectStepNote.Content);
                    DbUtils.AddParameter(cmd, "@Id", projectStepNote.Id);
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
                    cmd.CommandText = "DELETE FROM ProjectStepNotes WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
