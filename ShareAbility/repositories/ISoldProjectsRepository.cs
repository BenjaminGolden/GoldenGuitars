using GoldenGuitars.models;
using System.Collections.Generic;

namespace GoldenGuitars.repositories
{
    public interface ISoldProjectsRepository
    {
        void Add(SoldProjects soldProject);
        void Delete(int id);
        List<SoldProjects> GetAll();
        SoldProjects GetById(int id);
        void Update(SoldProjects soldProject);
    }
}