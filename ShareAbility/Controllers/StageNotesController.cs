using GoldenGuitars.repositories;
using GoldenGuitars.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace GoldenGuitars.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectStepNotesController : ControllerBase
    {
        private readonly IProjectStepNotesRepository _ProjectStepNotesRepository;
        public ProjectStepNotesController(IProjectStepNotesRepository ProjectStepNotesRepository)
        {
            _ProjectStepNotesRepository = ProjectStepNotesRepository;
        }

        //Get All
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_ProjectStepNotesRepository.GetAll());
        }

        //Get by Id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var project = _ProjectStepNotesRepository.GetById(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        //Add a ProjectStep
        [HttpPost]
        public IActionResult Post(ProjectStepNotes ProjectStep)
        {
            _ProjectStepNotesRepository.Add(ProjectStep);
            return CreatedAtAction("get", new { id = ProjectStep.Id }, ProjectStep);
        }

        //Delete a ProjectStep
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _ProjectStepNotesRepository.Delete(id);
            return NoContent();
        }

        //Update a ProjectStep
        [HttpPut("{id}")]
        public IActionResult Put(int id, ProjectStepNotes ProjectStep)
        {
            if (id != ProjectStep.Id)
            {
                return BadRequest();
            }

            _ProjectStepNotesRepository.Update(ProjectStep);
            return NoContent();
        }
    }
}

