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
    public class StepsRepository : BaseRepository, IStepsRepository
    {
        public StepsRepository(IConfiguration configuration) : base(configuration) { }
        public List<Steps> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT * From Steps;
            ";

                    var reader = cmd.ExecuteReader();

                    var steps = new List<Steps>();
                    while (reader.Read())
                    {
                        steps.Add(new Steps()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    reader.Close();

                    return steps;
                }
            }
        }



        public Steps GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              SELECT Id, Name
                      
                        FROM Steps 
                       
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Steps steps = null;
                    if (reader.Read())
                    {
                        steps = new Steps()
                        {

                            Id = id,
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return steps;
                }
            }
        }



        public void Add(Steps steps)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Steps (Name, Email, firebaseId)
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", steps.Name);



                    steps.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Steps steps)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Steps
                               SET Name = @name

                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", steps.Name);


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
                    cmd.CommandText = "DELETE FROM Steps WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
