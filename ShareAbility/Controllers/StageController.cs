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
    public class StageController : ControllerBase
    {
        private readonly IStageRepository _stageRepository;
        public StageController(IStageRepository stageRepository)
        {
            _stageRepository = stageRepository;
        }

        //Get All
        [HttpGet("project/{id}")]
        public IActionResult GetAll(int id)
        {
            return Ok(_stageRepository.GetAll(id));
        }

        //Get by Id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var stage = _stageRepository.GetById(id);
            if (stage == null)
            {
                return NotFound();
            }
            return Ok(stage);
        }

        //Add a stage
        [HttpPost]
        public IActionResult Post(Stage stage)
        {
            _stageRepository.Add(stage);
            return CreatedAtAction("get", new { id = stage.Id }, stage);
        }

        //Delete a stage
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _stageRepository.Delete(id);
            return NoContent();
        }

        //Update a stage
        [HttpPut("{id}")]
        public IActionResult Put(int id, Stage stage)
        {
            if (id != stage.Id)
            {
                return BadRequest();
            }

            _stageRepository.Update(stage);
            return NoContent();
        }
    }
}
