using GoldenGuitars.models;
using GoldenGuitars.Repositories;
using GoldenGuitars.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace GoldenGuitars.repositories
{
    public class ExpensesRepository : BaseRepository, IExpensesRepository
    {
        public ExpensesRepository(IConfiguration configuration) : base(configuration) { }

        public List<Expenses> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT * From Expenses;
            ";

                    var reader = cmd.ExecuteReader();

                    var expenses = new List<Expenses>();
                    while (reader.Read())
                    {
                        expenses.Add(new Expenses()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Price = DbUtils.GetInt(reader, "price"),
                            DatePurchased = DbUtils.GetDateTime(reader, "datePurchased"),
                            Reimbursable = DbUtils.GetString(reader, "reimbursable")
                          
                        });
                    }

                    reader.Close();

                    return expenses;
                }
            }
        }

        public Expenses GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * from Expenses
                                        where id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Expenses expense = null;
                    if (reader.Read())
                    {
                        expense = new Expenses()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Price = DbUtils.GetInt(reader, "price"),
                            DatePurchased = DbUtils.GetDateTime(reader, "datePurchased"),
                            Reimbursable = DbUtils.GetString(reader, "reimbursable")
                        };
                    }
                    reader.Close();

                    return expense;
                }
            }
        }

        public void Add(Expenses expense)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Expenses 
                    (Name, Price, DatePUrchased,                               Reimbursable)
                     OUTPUT INSERTED.ID
                     VALUES (@Name, @Price, @DatePurchased,                          @Reimbursable)";

                    DbUtils.AddParameter(cmd, "@Name", expense.Name);
                    DbUtils.AddParameter(cmd, "@Price", expense.Price);
                    DbUtils.AddParameter(cmd, "@DatePurchased", expense.DatePurchased);
                    DbUtils.AddParameter(cmd, "@Reimbursable", expense.Reimbursable);
                    

                    expense.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void Update(Expenses expense)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Expenses
                    SET Name = @Name,
                        Price = @Price,
                        DatePurchased = @DatePurchased,
                        Reimbursable = @Reimbursable";

                    DbUtils.AddParameter(cmd, "@Name", expense.Name);
                    DbUtils.AddParameter(cmd, "@Price", expense.Price);
                    DbUtils.AddParameter(cmd, "@DatePurchased", expense.DatePurchased);
                    DbUtils.AddParameter(cmd, "@Reimbursable", expense.Reimbursable);

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
                    cmd.CommandText = @"UPDATE Expenses
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
