using GoldenGuitars.repositories;
using GoldenGuitars.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GoldenGuitars.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectStepNotesController : ControllerBase
    {
        private readonly IProjectStepNotesRepository _projectStepNotesRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public ProjectStepNotesController(IProjectStepNotesRepository projectStepNotesRepository, IUserProfileRepository userProfileRepository)
        {
            _projectStepNotesRepository = projectStepNotesRepository;
            _userProfileRepository = userProfileRepository;
        }

        //Get All
        [HttpGet("{id}")]
        public IActionResult GetAll(int id)
        {
            return Ok(_projectStepNotesRepository.GetAllNotesByStepId(id));
        }

        //Get by Id
        [HttpGet("singleNote/{id}")]
        public IActionResult Get(int id)
        {
            var projectNote = _projectStepNotesRepository.GetById(id);
            if (projectNote == null)
            {
                return NotFound();
            }
            return Ok(projectNote);
        }

        //Add a ProjectStep Note
        [HttpPost]
        public IActionResult Post(ProjectStepNotes projectStepNote)
        {
            var userProfile = GetCurrentUserProfile();
            projectStepNote.UserProfileId = userProfile.Id;
            _projectStepNotesRepository.Add(projectStepNote);
            return CreatedAtAction(nameof(Get), new { id = projectStepNote.Id }, projectStepNote);
        }

        //Delete a ProjectStepNote
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _projectStepNotesRepository.Delete(id);
            return NoContent();
        }

        //Update a ProjectStepNote
        [HttpPut("{id}")]
        public IActionResult Put(int id, ProjectStepNotes projectStepNote)
        {
            if (id != projectStepNote.Id)
            {
                return BadRequest();
            }

            _projectStepNotesRepository.Update(projectStepNote);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

