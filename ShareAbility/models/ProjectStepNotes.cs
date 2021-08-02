using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenGuitars.models
{
    public class ProjectStepNotes
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int UserProfileId { get; set; }
        public int StepId { get; set; }
        public Steps Steps { get; set; }
        public UserProfile UserProfile { get; set; }
        public Project Project { get; set; }
    }
}
