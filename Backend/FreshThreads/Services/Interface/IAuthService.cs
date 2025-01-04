﻿

using FreshThreads.DTO;
using FreshThreads.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace JWTImplementation.Interfaces
{
    public interface IAuthService
    {
        Users AddUser(UserDto userDto);
        string Login(LoginRequest loginRequest);


    }


}
