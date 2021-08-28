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
    public class ExpensesController : ControllerBase
    {
        private readonly IExpensesRepository _expensesRepository;
        public ExpensesController(IExpensesRepository expensesRepository)
        {
            _expensesRepository = expensesRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_expensesRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var expenses = _expensesRepository.GetById(id);
            if (expenses == null)
            {
                return NotFound();

            }
            return Ok(expenses);
        }

        [HttpPost]  
        public IActionResult Post(Expenses expenses)
        {
            _expensesRepository.Add(expenses);
            return CreatedAtAction("get", new { id = expenses.Id }, expenses);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _expensesRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Expenses expenses)
        {
            if (id != expenses.Id)
            {
                return BadRequest();
            }

            _expensesRepository.Update(expenses);
            return NoContent();
        }
    }

}
