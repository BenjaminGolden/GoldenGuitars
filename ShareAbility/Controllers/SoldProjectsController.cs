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
    public class SoldProjectsController : ControllerBase
    {
        private readonly ISoldProjectsRepository _soldProjectsRepository;
        public SoldProjectsController(ISoldProjectsRepository soldProjectsRepository)
        {
            _soldProjectsRepository = soldProjectsRepository;
        }

        //Get All
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_soldProjectsRepository.GetAll());
        }

        //Get by Id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var soldProject = _soldProjectsRepository.GetById(id);
            if (soldProject == null)
            {
                return NotFound();
            }
            return Ok(soldProject);
        }

        //Add a soldProject
        [HttpPost]
        public IActionResult Post(SoldProjects soldProject)
        {
            _soldProjectsRepository.Add(soldProject);
            return CreatedAtAction("get", new { id = soldProject.Id }, soldProject);
        }

        //Delete a soldProject
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _soldProjectsRepository.Delete(id);
            return NoContent();
        }

        //Update a soldProject
        [HttpPut("{id}")]
        public IActionResult Put(int id, SoldProjects soldProject)
        {
            if (id != soldProject.Id)
            {
                return BadRequest();
            }

            _soldProjectsRepository.Update(soldProject);
            return NoContent();
        }
    }
}
