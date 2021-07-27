using GoldenGuitars.models;
using System.Collections.Generic;

namespace GoldenGuitars.repositories
{
    public interface IStepsRepository
    {
        void Add(Steps steps);
        void Delete(int id);
        List<Steps> GetAll();
        Steps GetById(int id);
        void Update(Steps steps);
    }
}