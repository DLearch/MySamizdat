using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.ViewModels.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    public class AdminController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _db;

        public AdminController(
            UserManager<User> userManager,
            AppDbContext db
        )
        {
            _userManager = userManager;
            _db = db;
        }

        //[HttpPost]
        //public async Task<IActionResult> AddLanguage(AddLanguageVM model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        User user = await _userManager.GetUserAsync(User);

        //        if (user != null)
        //        {
        //            _db.Languages.Add(new Language()
        //            {
        //                TK = model.LanguageTK
        //            });

        //            await _db.SaveChangesAsync();

        //            return Ok();
        //        }
        //        else
        //            ModelState.AddModelError("User", "not-found");
        //    }

        //    return BadRequest(ModelState);
        //}

        //[HttpPost]
        //public async Task<IActionResult> RemoveLanguage(RemoveLanguageVM model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        User user = await _userManager.GetUserAsync(User);

        //        if (user != null)
        //        {
        //            Language language = await _db.Languages.FindAsync(model.LanguageId);
                    
        //            if(language == null)
        //                ModelState.AddModelError("Language", "not-found");
        //            else
        //            {
        //                _db.Languages.Remove(language);

        //                await _db.SaveChangesAsync();

        //                return Ok();
        //            }
        //        }
        //        else
        //            ModelState.AddModelError("User", "not-found");
        //    }

        //    return BadRequest(ModelState);
        //}

        //[HttpPost]
        //public async Task<IActionResult> GetLanguages()
        //{
        //    if (ModelState.IsValid)
        //    {
        //        User user = await _userManager.GetUserAsync(User);

        //        if (user != null)
        //        {
        //            return Ok(new GetLanguagesRVM()
        //            {
        //                Languages = _db.Languages.ToList()
        //            });
        //        }
        //        else
        //            ModelState.AddModelError("User", "not-found");
        //    }

        //    return BadRequest(ModelState);
        //}

        //[HttpPost]
        //public async Task<IActionResult> AddGenre(AddGenreVM model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        User user = await _userManager.GetUserAsync(User);

        //        if (user != null)
        //        {
        //            _db.Genres.Add(new Genre()
        //            {
        //                TK = model.GenreTK
        //            });

        //            await _db.SaveChangesAsync();

        //            return Ok();
        //        }
        //        else
        //            ModelState.AddModelError("User", "not-found");
        //    }

        //    return BadRequest(ModelState);
        //}

        //[HttpPost]
        //public async Task<IActionResult> RemoveGenre(RemoveGenreVM model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        User user = await _userManager.GetUserAsync(User);

        //        if (user != null)
        //        {
        //            Genre genre = await _db.Genres.FindAsync(model.GenreId);

        //            if (genre == null)
        //                ModelState.AddModelError("Genre", "not-found");
        //            else
        //            {
        //                _db.Genres.Remove(genre);

        //                await _db.SaveChangesAsync();

        //                return Ok();
        //            }
        //        }
        //        else
        //            ModelState.AddModelError("User", "not-found");
        //    }

        //    return BadRequest(ModelState);
        //}

        //[HttpPost]
        //public async Task<IActionResult> GetGenres()
        //{
        //    if (ModelState.IsValid)
        //    {
        //        User user = await _userManager.GetUserAsync(User);

        //        if (user != null)
        //        {
        //            return Ok(new GetGenresRVM()
        //            {
        //                Genres = _db.Genres.ToList()
        //            });
        //        }
        //        else
        //            ModelState.AddModelError("User", "not-found");
        //    }

        //    return BadRequest(ModelState);
        //}
    }
}
