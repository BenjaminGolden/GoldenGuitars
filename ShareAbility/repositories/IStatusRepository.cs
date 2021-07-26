using GoldenGuitars.models;
using System.Collections.Generic;

namespace GoldenGuitars.repositories
{
    public interface IStatusRepository
    {
        void Add(Status status);
        void Delete(int id);
        List<Status> GetAll();
        Status GetById(int id);
        void Update(Status status);
    }
}