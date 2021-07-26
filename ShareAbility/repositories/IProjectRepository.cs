using GoldenGuitars.models;
using System.Collections.Generic;

namespace GoldenGuitars.repositories
{
    public interface IProjectRepository
    {
        void Add(Project project);
        void Delete(int id);
        List<Project> GetAll();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        Project GetById(int id);
        void Update(Project project);
    }
}