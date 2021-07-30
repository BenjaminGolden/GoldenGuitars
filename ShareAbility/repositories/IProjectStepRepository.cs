using GoldenGuitars.models;
using System.Collections.Generic;

namespace GoldenGuitars.repositories
{
    public interface IProjectStepRepository
    {
        void Add(ProjectStep ProjectStep);
        void Delete(int id);
        List<ProjectStep> GetAll(int id);
        List<ProjectStep> GetAllFromUserByProjectId(int userId, int projectId);
        ProjectStep GetById(int id);
        void Update(ProjectStep ProjectStep);
    }
}