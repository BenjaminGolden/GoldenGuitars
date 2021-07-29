using GoldenGuitars.models;
using System.Collections.Generic;

namespace GoldenGuitars.repositories
{
    public interface IProjectStepNotesRepository
    {
        void Add(ProjectStepNotes ProjectStepNotes);
        void Delete(int id);
        List<ProjectStepNotes> GetAll(int id);
        ProjectStepNotes GetById(int id);
        void Update(ProjectStepNotes ProjectStepNote);
    }
}