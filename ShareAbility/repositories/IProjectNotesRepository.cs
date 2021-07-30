using GoldenGuitars.models;
using System.Collections.Generic;

namespace GoldenGuitars.repositories
{
    public interface IProjectNotesRepository
    {
        void Add(ProjectNotes projectNote);
        void Delete(int id);
        List<ProjectNotes> GetAll(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        ProjectNotes GetByProjectId(int id);
        void Update(ProjectNotes projectNote);
    }
}