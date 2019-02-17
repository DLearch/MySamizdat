using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class ImageStorage
    {
        public string ImagesPath => Path.Combine(_appEnvironment.WebRootPath, "images");

        IHostingEnvironment _appEnvironment;

        public ImageStorage(
            IHostingEnvironment appEnvironment
            )
        {
            _appEnvironment = appEnvironment;
        }

        public async Task<string> SaveImageAsync(string path, IFormFile uploadedFile)
        {
            if (uploadedFile == null)
                throw new ArgumentNullException("uploadedFile");
            
            DirectoryInfo dirInfo = new DirectoryInfo(Path.Combine(ImagesPath, path));
            if (!dirInfo.Exists)
                dirInfo.Create();

            string fileName = DateTime.Now.Ticks + '.' + uploadedFile.FileName;

            using (var fileStream = new FileStream(Path.Combine(ImagesPath, path, fileName), FileMode.Create))
            {
                await uploadedFile.CopyToAsync(fileStream);
            }

            return Path.Combine(path, fileName);
        }

        public void RemoveImage(string path)
        {

        }
    }
}
