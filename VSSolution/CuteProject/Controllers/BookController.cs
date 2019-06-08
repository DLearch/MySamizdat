using CuteProject.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CuteProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private const string ERROR_ALREADY = "already";
        private AppDbContext _db;

        public BookController(AppDbContext db)
        {
            _db = db;
        }

        // GET api/book
        [HttpGet]
        public ActionResult<IEnumerable<Book>> Get()
        {
            // Return all books
            return _db.Books;
        }

        // GET api/book/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetAsync(int id)
        {
            // Get book to return
            Book book =  await _db.Books.FindAsync(id);

            // Return 404 if the book is not found
            if (book == null)
                return NotFound();

            // Return 200 with book
            return book;
        }

        // POST api/book
        [HttpPost]
        public async Task<ActionResult<int>> PostAsync([FromBody] Book newBook)
        {
            // Add error to ModelState if the book title is non-unique
            if (_db.Books.Any(p => p.Title == newBook.Title))
                ModelState.AddModelError("Title", ERROR_ALREADY);

            // Return 400 and ModelState if ModelState is not valid
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Set creation time
            newBook.CreationTime = DateTime.Now;

            // Add book to db
            await _db.AddAsync(newBook);

            // Save db changes
            await _db.SaveChangesAsync();

            // Return 200 with id
            return Ok(newBook.Id);
        }

        // PUT api/book/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Book book)
        {
            // Get book from db
            Book bookToUpdate = await _db.Books.FindAsync(id);

            // Return 404 if the book is not found
            if (bookToUpdate == null)
                return NotFound();

            // Add error to ModelState if the new book title is non-unique
            if (bookToUpdate.Title != book.Title && _db.Books.Any(p => p.Title == book.Title))
                ModelState.AddModelError("Title", ERROR_ALREADY);

            // Return 400 and ModelState if ModelState is not valid
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Update book fields
            bookToUpdate.Title = book.Title;
            bookToUpdate.Description = book.Description;

            // Save db changes
            await _db.SaveChangesAsync();

            // Return 200
            return Ok();
        }

        // DELETE api/book/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            // Get book from db
            Book book = await _db.Books.FindAsync(id);

            // Return 404 if the book is not found
            if (book == null)
                return NotFound();

            // Remove book from db
            _db.Books.Remove(book);

            // Save db changes
            await _db.SaveChangesAsync();

            // Return 200
            return Ok();
        }
    }
}
