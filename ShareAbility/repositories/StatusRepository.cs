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
    public class StatusRepository : BaseRepository, IStatusRepository
    {
        public StatusRepository(IConfiguration configuration) : base(configuration) { }
        public List<Status> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT * From Status;
            ";

                    var reader = cmd.ExecuteReader();

                    var statuses = new List<Status>();
                    while (reader.Read())
                    {
                        statuses.Add(new Status()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    reader.Close();

                    return statuses;
                }
            }
        }



        public Status GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              SELECT Id, Name
                      
                        FROM Status 
                       
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Status status = null;
                    if (reader.Read())
                    {
                        status = new Status()
                        {

                            Id = id,
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return status;
                }
            }
        }



        public void Add(Status status)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Status (Name, Email, firebaseId)
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", status.Name);



                    status.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Status status)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Status
                               SET Name = @name

                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", status.Name);


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
                    cmd.CommandText = "DELETE FROM Status WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
