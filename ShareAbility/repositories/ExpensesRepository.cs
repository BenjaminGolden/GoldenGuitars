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
    public class ExpensesRepository : BaseRepository 
    {
        public ExpensesRepository(IConfiguration configuration) : base(configuration) { }

        public List<Expenses> GetAll(int id)
        {
            using (var cmd = Connection.CreateCommand())
            {
                cmd.CommandText = @"SELECT * FROM Expenses e";

                DbUtils.AddParameter(cmd, "@Id", id);
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
                        Reimbursable = DbUtils.GetBool(reader, "reimbursable"),
                        TotalCost = DbUtils.GetInt(reader, "totalCost")

                    });
                }
            }    
        }
    }
}
