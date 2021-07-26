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
    public class StageNotesRepository : BaseRepository, IStageNotesRepository
    {
        public StageNotesRepository(IConfiguration configuration) : base(configuration) { }

        public List<StageNotes> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM StageNotes
                   ";



                    var reader = cmd.ExecuteReader();
                    var stageNotes = new List<StageNotes>();
                    while (reader.Read())
                    {
                        stageNotes.Add(new StageNotes()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Content = DbUtils.GetString(reader, "content"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            StageId = DbUtils.GetInt(reader, "StageId")

                        });

                    }
                    reader.Close();
                    return stageNotes;
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

        public StageNotes GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM StageNotes
                    WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    StageNotes stageNote = null;
                    if (reader.Read())
                    {
                        stageNote = new StageNotes()
                        {
                            Id = id,
                            Content = DbUtils.GetString(reader, "content"),
                            UserProfileId = DbUtils.GetInt(reader, "userProfileId"),
                            StageId = DbUtils.GetInt(reader, "StageId"),
                        };
                    }
                    reader.Close();

                    return stageNote;
                }
            }
        }

        public void Add(StageNotes stageNotes)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO StageNotes (Content, UserProfileId, StageId)
                        OUTPUT INSERTED.ID
                        VALUES (@Content, @userProfileId, @StageId)";

                    DbUtils.AddParameter(cmd, "@Content", stageNotes.Content);
                    DbUtils.AddParameter(cmd, "@projectId", stageNotes.StageId);
                    DbUtils.AddParameter(cmd, "@userProfileId", stageNotes.UserProfileId);


                    stageNotes.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(StageNotes stageNote)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE StageNotes
                               SET Content = @Content,
                                   userProfileId = @completionDate,
                                   stageId = @stageId

                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Content", stageNote.Content);
                    DbUtils.AddParameter(cmd, "@userProfileId", stageNote.UserProfileId);
                    DbUtils.AddParameter(cmd, "@ProjectId", stageNote.StageId);


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
                    cmd.CommandText = "DELETE FROM StageNotesx WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
