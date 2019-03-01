using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.ViewModels.Language;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    public class LanguageController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _db;

        public LanguageController(
            UserManager<User> userManager,
            AppDbContext db
        )
        {
            _userManager = userManager;
            _db = db;
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user == null)
                    ModelState.AddModelError("User", "not-found");
                else
                {
                    _db.Languages.Add(new Language()
                    {
                        Id = model.LanguageTK
                    });

                    await _db.SaveChangesAsync();

                    return Ok();
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> Remove(RemoveVM model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.GetUserAsync(User);

                if (user == null)
                    ModelState.AddModelError("User", "not-found");
                else
                {
                    Language language = await _db.Languages.FindAsync(model.LanguageTK);

                    if (language == null)
                        ModelState.AddModelError("Language", "not-found");
                    else
                    {
                        if (language.Books.Count > 0)
                            ModelState.AddModelError("Language", "already-used");
                        else
                        {
                            _db.Languages.Remove(language);

                            await _db.SaveChangesAsync();

                            return Ok();
                        }
                    }
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        public ActionResult Get() => Ok(_db.Languages.Select(l => l.Id).ToList());
    }
}
