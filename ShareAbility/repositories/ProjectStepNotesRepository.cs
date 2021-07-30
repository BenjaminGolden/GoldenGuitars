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

        public List<ProjectStepNotes> GetAllNotesByProjectAndStepId(int projectId, int stepId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT sn.id, sn.content, sn.userProfileId, sn.stepId, ps.ProjectId FROM ProjectStepNotes sn
                    Left Join ProjectStep ps on ps.stepId = sn.stepId
                    WHERE sn.stepId = @stepId";

                    DbUtils.AddParameter(cmd, "@stepId", stepId);
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
                            ProjectStep = new ProjectStep()
                            {
                                ProjectId = DbUtils.GetInt(reader, "projectId")
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

        public void Update(ProjectStepNotes ProjectStepNote)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE ProjectStepNotes
                               SET Content = @Content,
                                   userProfileId = @userProfileId,
                                   stepId = @stepId

                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Content", ProjectStepNote.Content);
                    DbUtils.AddParameter(cmd, "@userProfileId", ProjectStepNote.UserProfileId);
                    DbUtils.AddParameter(cmd, "@StepId", ProjectStepNote.StepId);


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
