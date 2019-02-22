using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class FilesStorage
    {
        public string FilesFolder => "files";

        IHostingEnvironment _appEnvironment;

        public FilesStorage(
            IHostingEnvironment appEnvironment
            )
        {
            _appEnvironment = appEnvironment;
        }

        public async Task<string> SaveAsync(IFormFile file)
        {
            if (file == null)
                throw new ArgumentNullException("file");
            
            string filePath = Path.Combine(FilesFolder, Path.GetRandomFileName() + '.' + file.FileName);
            
            using (var fileStream = new FileStream(Path.Combine(_appEnvironment.WebRootPath, filePath), FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return filePath;
        }

        public void Delete(string filePath)
        {
            if (filePath == null)
                throw new ArgumentNullException("filePath");

            FileInfo fileInfo = new FileInfo(Path.Combine(_appEnvironment.WebRootPath, filePath));

            if (fileInfo.Exists)
                fileInfo.Delete();
        }
    }
}
