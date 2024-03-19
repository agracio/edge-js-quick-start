using System;

namespace ExternalLibrary
{
    public class Person
    {
        public Guid Id => Guid.NewGuid();
        public string Name => "Peter Smith";
        public string Email => "peter.smith@electron-quick-start.com";

    }

    public class Library
    {
        public Person GetPerson()
        {
            return new Person();
        }
    }
}