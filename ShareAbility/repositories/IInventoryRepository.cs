using GoldenGuitars.models;
using System.Collections.Generic;

namespace GoldenGuitars.repositories
{
    public interface IInventoryRepository
    {
        void Add(Inventory inventory);
        void Delete(int id);
        List<Inventory> GetAll();
        Inventory GetById(int id);
        void Update(Inventory inventory);
    }
}