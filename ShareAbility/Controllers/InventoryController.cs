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
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryRepository _inventoryRepository;
        public InventoryController(IInventoryRepository inventoryRepository)
        {
            _inventoryRepository = inventoryRepository;
        }

        //Get All
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_inventoryRepository.GetAll());
        }

        //Get by Id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var inventory = _inventoryRepository.GetById(id);
            if (inventory == null)
            {
                return NotFound();
            }
            return Ok(inventory);
        }

        //Add a inventory
        [HttpPost]
        public IActionResult Post(Inventory inventory)
        {
            _inventoryRepository.Add(inventory);
            return CreatedAtAction("get", new { id = inventory.Id }, inventory);
        }

        //Delete a inventory
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _inventoryRepository.Delete(id);
            return NoContent();
        }

        //Update a inventory
        [HttpPut("{id}")]
        public IActionResult Put(int id, Inventory inventory)
        {
            if (id != inventory.Id)
            {
                return BadRequest();
            }

            _inventoryRepository.Update(inventory);
            return NoContent();
        }
    }
}
