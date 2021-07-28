using GoldenGuitars.models;
using GoldenGuitars.repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenGuitars.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectStepController : ControllerBase
    {
        private readonly IProjectStepRepository _ProjectStepRepository;
        public ProjectStepController(IProjectStepRepository ProjectStepRepository)
        {
            _ProjectStepRepository = ProjectStepRepository;
        }

        //Get All
        [HttpGet("project/{id}")]
        public IActionResult GetAll(int id)
        {
            return Ok(_ProjectStepRepository.GetAll(id));
        }

        //Get by Id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var ProjectStep = _ProjectStepRepository.GetById(id);
            if (ProjectStep == null)
            {
                return NotFound();
            }
            return Ok(ProjectStep);
        }

        //Add a ProjectStep
        [HttpPost]
        public IActionResult Post(ProjectStep ProjectStep)
        {
            _ProjectStepRepository.Add(ProjectStep);
            return CreatedAtAction("get", new { id = ProjectStep.Id }, ProjectStep);
        }

        //Delete a ProjectStep
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _ProjectStepRepository.Delete(id);
            return NoContent();
        }

        //Update a ProjectStep
        [HttpPut("{id}")]
        public IActionResult Put(int id, ProjectStep ProjectStep)
        {
            if (id != ProjectStep.Id)
            {
                return BadRequest();
            }

            _ProjectStepRepository.Update(ProjectStep);
            return NoContent();
        }
    }
}
