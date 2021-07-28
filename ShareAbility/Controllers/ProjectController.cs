using GoldenGuitars.models;
using GoldenGuitars.repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GoldenGuitars.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IStepsRepository _stepsRepository;
        private readonly IStageRepository _stageRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public ProjectController(IProjectRepository projectRepository, IStepsRepository stepsRepository, IStageRepository stageRepository, IUserProfileRepository userProfileRepository)
        {
            _projectRepository = projectRepository;
            _stepsRepository = stepsRepository;
            _stageRepository = stageRepository;
            _userProfileRepository = userProfileRepository;
        }

        //Get All
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_projectRepository.GetAll());
        }

        //Get by Id
        [HttpGet("details/{id}")]
        public IActionResult Get(int id)
        {
            var project = _projectRepository.GetById(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        //Add a project
        [HttpPost]
        public IActionResult Post(Project project)
        {
            project.StartDate = DateTime.Now;
            var projectId = _projectRepository.Add(project);
            CreateProjectStages(projectId);
            return CreatedAtAction(nameof(Get), new { id = project.Id }, project);
        }

        //Delete a project
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _projectRepository.Delete(id);
            return NoContent();
        }

        //Update a project
        [HttpPut("{id}")]
        public IActionResult Put(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            _projectRepository.Update(project);
            return NoContent();
        }

        //create a helper method 

        

        private void CreateProjectStages(int projectId)
        {
            var userProfile = GetCurrentUserProfile();
            var stepList = _stepsRepository.GetAll();
            foreach (var step in stepList)
            {
                Stage stage = new Stage()
                {
                    StepsId = step.Id,
                    ProjectId = projectId,
                    UserProfileId = userProfile.Id,
                    StatusId = 1
                };
                _stageRepository.Add(stage);
            }
        }
         private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
