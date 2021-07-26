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
    public class StageRepository : BaseRepository, IStageRepository
    {
        public StageRepository(IConfiguration configuration) : base(configuration) { }

        public List<Stage> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM Stage
                   ";

                    //DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    var stage = new List<Stage>();
                    while (reader.Read())
                    {
                        stage.Add(new Stage()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                            UserProfileId = DbUtils.GetNullableInt(reader, "UserProfileId"),
                            StatusId = DbUtils.GetInt(reader, "StatusId")

                        });

                    }
                    reader.Close();
                    return stage;
                }
            }
        }

        public Stage GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM Stage
                    WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Stage stage = null;
                    if (reader.Read())
                    {
                        stage = new Stage()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "Name"),
                            ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                            UserProfileId = DbUtils.GetNullableInt(reader, "UserProfileId"),
                            StatusId = DbUtils.GetInt(reader, "StatusId")
                        };
                    }
                    reader.Close();

                    return stage;
                }
            }
        }

        public void Add(Stage stage)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Stage (Name, ProjectId, UserProfileId, StatusId)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @ProjectId, @userProfileId, @StatusId)";

                    DbUtils.AddParameter(cmd, "@Name", stage.Name);
                    DbUtils.AddParameter(cmd, "@projectId", stage.ProjectId);
                    DbUtils.AddParameter(cmd, "@userProfileId", stage.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Content", stage.StatusId);


                    stage.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Stage stage)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Stage
                               SET Name = @Name
                                   ProjectId= @projectId,
                                   userProfileId = @userProfileId
                                   statusId = @statusId

                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", stage.Name);
                    DbUtils.AddParameter(cmd, "@ProjectId", stage.ProjectId);
                    DbUtils.AddParameter(cmd, "@userProfileId", stage.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Content", stage.StatusId);


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
                    cmd.CommandText = "DELETE FROM Stage WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
