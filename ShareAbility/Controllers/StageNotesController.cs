using GoldenGuitars.repositories;
using GoldenGuitars.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace GoldenGuitars.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StageNotesController : ControllerBase
    {
        private readonly IStageNotesRepository _stageNotesRepository;
        public StageNotesController(IStageNotesRepository stageNotesRepository)
        {
            _stageNotesRepository = stageNotesRepository;
        }

        //Get All
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_stageNotesRepository.GetAll());
        }

        //Get by Id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var project = _stageNotesRepository.GetById(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        //Add a stage
        [HttpPost]
        public IActionResult Post(StageNotes stage)
        {
            _stageNotesRepository.Add(stage);
            return CreatedAtAction("get", new { id = stage.Id }, stage);
        }

        //Delete a stage
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _stageNotesRepository.Delete(id);
            return NoContent();
        }

        //Update a stage
        [HttpPut("{id}")]
        public IActionResult Put(int id, StageNotes stage)
        {
            if (id != stage.Id)
            {
                return BadRequest();
            }

            _stageNotesRepository.Update(stage);
            return NoContent();
        }
    }
}

