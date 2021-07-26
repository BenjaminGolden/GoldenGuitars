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
    public class ProjectNotesController : ControllerBase
    {
        private readonly IProjectNotesRepository _projectNotesRepository;
        public ProjectNotesController(IProjectNotesRepository projectNotesRepository)
        {
            _projectNotesRepository = projectNotesRepository;
        }

        //Get All
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_projectNotesRepository.GetAll());
        }

        //Get by Id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var project = _projectNotesRepository.GetByProjectId(id);
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
        public IActionResult Put(int id, ProjectNotes project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            _projectNotesRepository.Update(project);
            return NoContent();
        }
    }
}
