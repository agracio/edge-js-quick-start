using System.Threading.Tasks;
using ExternalLibrary;

namespace QuickStart
{
    class ExternalMethods
    {
        public async Task<object> GetPersonInfo(dynamic input)
        {
            return await Task.Run(() => new Person(input.name, input.email, input.age));
        }
        
        public async Task<object> RunEuler(dynamic input)
        {
            return await Task.Run(() => new Euler().Main());
        }
    }
}
