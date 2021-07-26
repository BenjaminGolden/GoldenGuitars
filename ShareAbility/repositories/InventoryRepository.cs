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
    public class InventoryRepository : BaseRepository, IInventoryRepository
    {
        public InventoryRepository(IConfiguration configuration) : base(configuration) { }
        public List<Inventory> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT * From Inventory;
            ";

                    var reader = cmd.ExecuteReader();

                    var inventory = new List<Inventory>();
                    while (reader.Read())
                    {
                        inventory.Add(new Inventory()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Stock = DbUtils.GetInt(reader, "Stock")
                        });
                    }

                    reader.Close();

                    return inventory;
                }
            }
        }



        public Inventory GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              SELECT Id, Name, Stock
                      
                        FROM Inventory 
                       
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Inventory inventory = null;
                    if (reader.Read())
                    {
                        inventory = new Inventory()
                        {

                            Id = id,
                            Name = DbUtils.GetString(reader, "Name"),
                            Stock = DbUtils.GetInt(reader, "Stock")
                        };
                    }

                    reader.Close();

                    return inventory;
                }
            }
        }



        public void Add(Inventory inventory)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Inventory (Name, Stock)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Stock)";

                    DbUtils.AddParameter(cmd, "@Name", inventory.Name);
                    DbUtils.AddParameter(cmd, "@Stock", inventory.Stock);

                    inventory.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Inventory inventory)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Inventory
                               SET Name = @name
                                   Stock = @Stock

                             WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", inventory.Name);
                    DbUtils.AddParameter(cmd, "@Stock", inventory.Stock);


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
                    cmd.CommandText = "DELETE FROM Inventory WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
