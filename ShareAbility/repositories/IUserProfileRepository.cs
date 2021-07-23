using GoldenGuitars.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenGuitars.repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        //void Delete(int id);
        List<UserProfile> GetAll();
        UserProfile GetById(int id);
        //void Update(UserProfile user);

        UserProfile GetByFirebaseUserId(string firebaseUserId);

    }
}
