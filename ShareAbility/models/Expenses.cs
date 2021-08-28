using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenGuitars.models
{
    public class Expenses
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public DateTime DatePurchased { get; set; }
        public bool Reimbursable { get; set; }
        public int TotalCost { get; set; }

    }
}
