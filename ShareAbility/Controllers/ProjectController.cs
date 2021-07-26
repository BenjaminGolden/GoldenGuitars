using GoldenGuitars.models;
using GoldenGuitars.repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenGuitars.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        //Get All
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_projectRepository.GetAll());
        }

        //Get by Id
        [HttpGet("{id}")]
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
            _projectRepository.Add(project);
            return CreatedAtAction("get", new { id = project.Id }, project);
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
    }
}
