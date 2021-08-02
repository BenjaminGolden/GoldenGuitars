using GoldenGuitars.models;
using GoldenGuitars.repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenGuitars.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly IStatusRepository _statusRepository;
        public StatusController(IStatusRepository statusRepository)
        {
            _statusRepository = statusRepository;
        }

        //Get All
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_statusRepository.GetAll());
        }

        //Get by Id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var status = _statusRepository.GetById(id);
            if (status == null)
            {
                return NotFound();
            }
            return Ok(status);
        }

        //Add a status
        [HttpPost]
        public IActionResult Post(Status status)
        {
            _statusRepository.Add(status);
            return CreatedAtAction("get", new { id = status.Id }, status);
        }

        //Delete a status
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _statusRepository.Delete(id);
            return NoContent();
        }

        //Update a status
        [HttpPut("{id}")]
        public IActionResult Put(int id, Status status)
        {
            if (id != status.Id)
            {
                return BadRequest();
            }

            _statusRepository.Update(status);
            return NoContent();
        }
    }
}
