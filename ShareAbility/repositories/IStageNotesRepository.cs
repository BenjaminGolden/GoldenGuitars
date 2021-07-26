using GoldenGuitars.models;
using System.Collections.Generic;

namespace GoldenGuitars.repositories
{
    public interface IStageNotesRepository
    {
        void Add(StageNotes stageNotes);
        void Delete(int id);
        List<StageNotes> GetAll();
        StageNotes GetById(int id);
        void Update(StageNotes stageNote);
    }
}