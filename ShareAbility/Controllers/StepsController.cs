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
    public class StepsController : ControllerBase
    {
        private readonly IStepsRepository _stepsRepository;
        public StepsController(IStepsRepository stepsRepository)
        {
            _stepsRepository = stepsRepository;
        }

        //Get All
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_stepsRepository.GetAll());
        }

        //Get by Id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var steps = _stepsRepository.GetById(id);
            if (steps == null)
            {
                return NotFound();
            }
            return Ok(steps);
        }

        //Add a steps
        [HttpPost]
        public IActionResult Post(Steps steps)
        {
            _stepsRepository.Add(steps);
            return CreatedAtAction("get", new { id = steps.Id }, steps);
        }

        //Delete a steps
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _stepsRepository.Delete(id);
            return NoContent();
        }

        //Update a steps
        [HttpPut("{id}")]
        public IActionResult Put(int id, Steps steps)
        {
            if (id != steps.Id)
            {
                return BadRequest();
            }

            _stepsRepository.Update(steps);
            return NoContent();
        }
    }
}
