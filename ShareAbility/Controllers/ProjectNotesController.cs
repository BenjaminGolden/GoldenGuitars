using GoldenGuitars.models;
using GoldenGuitars.repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace GoldenGuitars.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectNotesController : ControllerBase
    {
        private readonly IProjectNotesRepository _projectNotesRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public ProjectNotesController(IProjectNotesRepository projectNotesRepository, IUserProfileRepository userProfileRepository)
        {
            _projectNotesRepository = projectNotesRepository;
            _userProfileRepository = userProfileRepository;
        }

        //Get All
        [HttpGet("{id}")]
        public IActionResult GetAll(int id)
        {
            return Ok(_projectNotesRepository.GetAll(id));
        }

        //Get by Id
        [HttpGet("singleNote/{id}")]
        public IActionResult Get(int id)
        {
            var project = _projectNotesRepository.GetById(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        //Add a project
        [HttpPost]
        public IActionResult Post(ProjectNotes project)
        {
            var userProfile = GetCurrentUserProfile();
            project.UserProfileId = userProfile.Id;
            project.Date = DateTime.Now;
            _projectNotesRepository.Add(project);
            return CreatedAtAction("get", new { id = project.Id }, project);
        }

        //Delete a project
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _projectNotesRepository.Delete(id);
            return NoContent();
        }

        //Update a project
        [HttpPut("{id}")]
        public IActionResult Put(int id, ProjectNotes projectNote)
        {
            if (id != projectNote.Id)
            {
                return BadRequest();
            }
   
            _projectNotesRepository.Update(projectNote);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
