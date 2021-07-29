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
        private readonly IProjectStepRepository _ProjectStepRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IStatusRepository _statusRepository;
        public ProjectController(IProjectRepository projectRepository, IStepsRepository stepsRepository, IProjectStepRepository ProjectStepRepository, IUserProfileRepository userProfileRepository, IStatusRepository statusRepository)
        {
            _projectRepository = projectRepository;
            _stepsRepository = stepsRepository;
            _ProjectStepRepository = ProjectStepRepository;
            _userProfileRepository = userProfileRepository;
            _statusRepository = statusRepository;
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
            CreateProjectProjectSteps(projectId);
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

        

        private void CreateProjectProjectSteps(int projectId)
        {
            var userProfile = GetCurrentUserProfile();
            var stepList = _stepsRepository.GetAll();
            var id = 1;
            foreach (var step in stepList)
            {
                ProjectStep ProjectStep = new ProjectStep()
                {
                    StepId = step.Id,
                    ProjectId = projectId,
                    UserProfileId = userProfile.Id,
                    StatusId = id
                };
                _ProjectStepRepository.Add(ProjectStep);
            }
        }
         private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
