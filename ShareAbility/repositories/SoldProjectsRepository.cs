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
    public class SoldProjectsRepository : BaseRepository, ISoldProjectsRepository
    {
        public SoldProjectsRepository(IConfiguration configuration) : base(configuration) { }

        public List<SoldProjects> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM SoldProjects
                   ";

                    //DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    var soldProjects = new List<SoldProjects>();
                    while (reader.Read())
                    {
                        soldProjects.Add(new SoldProjects()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                            ClientName = DbUtils.GetString(reader, "ClientName"),
                            ClientEmail = DbUtils.GetString(reader, "ClientEmail")
                        });

                    }
                    reader.Close();
                    return soldProjects;
                }
            }
        }

        public SoldProjects GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM SoldProjects
                    WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    SoldProjects soldProject = null;
                    if (reader.Read())
                    {
                        soldProject = new SoldProjects()
                        {
                            Id = id,
                            ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                            ClientName = DbUtils.GetString(reader, "ClientName"),
                            ClientEmail = DbUtils.GetString(reader, "ClientEmail")
                        };
                    }
                    reader.Close();

                    return soldProject;
                }
            }
        }

        public void Add(SoldProjects soldProject)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO SoldProjects (ProjectId, ClientName, ClientEmail)
                        OUTPUT INSERTED.ID
                        VALUES (@ProjectId, @ClientName, @ClientEmail)";

                    DbUtils.AddParameter(cmd, "@projectId", soldProject.ProjectId);
                    DbUtils.AddParameter(cmd, "@ClientName", soldProject.ClientName);
                    DbUtils.AddParameter(cmd, "@ClientEmail", soldProject.ClientEmail);


                    soldProject.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(SoldProjects soldProject)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE SoldProjects
                               SET ProjectId = @ProjectId
                                   ClientName = @ClientName
                                   ClientEmail = @ClientEmail

                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@projectId", soldProject.ProjectId);
                    DbUtils.AddParameter(cmd, "@ClientName", soldProject.ClientName);
                    DbUtils.AddParameter(cmd, "@ClientEmail", soldProject.ClientEmail);


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
                    cmd.CommandText = "DELETE FROM SoldProjects WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
