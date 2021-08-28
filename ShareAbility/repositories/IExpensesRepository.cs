using GoldenGuitars.models;
using System.Collections.Generic;

namespace GoldenGuitars.repositories
{
    public interface IExpensesRepository
    {
        void Add(Expenses expense);
        void Delete(int id);
        List<Expenses> GetAll();
        Expenses GetById(int id);
        void Update(Expenses expense);
    }
}