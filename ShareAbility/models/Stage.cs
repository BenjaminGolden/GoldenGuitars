using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenGuitars.models
{
    public class Stage
    {
        public int Id { get; set; }
        public int StepsId { get; set; }
        public int ProjectId { get; set; }
        public int? UserProfileId { get; set; }
        public int StatusId { get; set; }
    }
}
