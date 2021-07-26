using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenGuitars.models
{
    public class StageNotes
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int UserProfileId { get; set; }
        public int StageId { get; set; }
    }
}
