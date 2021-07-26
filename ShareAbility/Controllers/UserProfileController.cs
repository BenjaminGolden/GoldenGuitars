
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
        [Authorize]
        [Route("api/[controller]")]
        [ApiController]
        public class UserProfileController : ControllerBase
        {
            private readonly IUserProfileRepository _userProfileRepository;
            public UserProfileController(IUserProfileRepository userProfileRepository)
            {
                _userProfileRepository = userProfileRepository;
            }

            [HttpGet("DoesUserExist/{firebaseUserId}")]
            public IActionResult GetByFirebaseUserId(string firebaseUserId)
            {
                var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
                if (userProfile == null)
                {
                    return NotFound();
                }
                return Ok(userProfile);
            }

            [HttpGet]
            public IActionResult Get()
            {
                return Ok(_userProfileRepository.GetAll());
            }

            //[HttpGet("GetWithComments")]
            //public IActionResult GetWithComments()
            //{
            //    var videos = _userProfileRepository.GetAllWithComments();
            //    return Ok(videos);
            //}

            [HttpGet("{id}")]
            public IActionResult Get(int id)
            {
                var video = _userProfileRepository.GetById(id);
                if (video == null)
                {
                    return NotFound();
                }
                return Ok(video);
            }

        //changed the CreatedAtAction nameof from getByFirebaseUserId to Get. Not sure why this fixed the problem.  
        [HttpPost]
        public IActionResult Register(UserProfile userProfile)
        {
          
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(Get), new { FirebaseId = userProfile.FirebaseId }, userProfile);
        }

        //[HttpGet("GetByIdWithComments/{id}")]
        //public IActionResult GetByIdWithComments(int id)
        //{
        //    var video = _userProfileRepository.GetByIdWithComments(id);
        //    if (video == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(video);
        //}

        //[HttpPost]
        //public IActionResult Post(UserProfile user)
        //{
        //    _userProfileRepository.Add(user);
        //    return CreatedAtAction("Get", new { id = user.Id }, user);
        //}

        //[HttpPut("{id}")]
        //public IActionResult Put(int id, UserProfile user)
        //{
        //    if (id != user.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _userProfileRepository.Update(user);
        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    _userProfileRepository.Delete(id);
        //    return NoContent();
        //}
    }
}
