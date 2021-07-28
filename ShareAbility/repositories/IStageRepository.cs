using GoldenGuitars.models;
using System.Collections.Generic;

namespace GoldenGuitars.repositories
{
    public interface IStageRepository
    {
        void Add(Stage stage);
        void Delete(int id);
        List<Stage> GetAll(int id);
        Stage GetById(int id);
        void Update(Stage stage);
    }
}