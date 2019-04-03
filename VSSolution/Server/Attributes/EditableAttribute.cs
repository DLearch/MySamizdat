using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Attributes
{
    public class EditableAttribute : Attribute
    {
        public bool MyProperty { get; set; }

        public EditableAttribute()
        {
        }

        public EditableAttribute(Func<string, bool> func, EditableConfig config)
        {
            
        }
    }

    public class EditableConfig
    {

    }   
}
