import axios from 'axios';

const ApiService = {
  testApi: () => {
    return axios.get('http://localhost:3001/user/login');
  },

  getProfile: (data) => {
    return axios.post('http://localhost:3001/api/v1/user/profile', data)
      .then((res) => {
        console.log(res);
        let firstName = res.data.body.firstName;
        let lastName = res.data.body.lastName;
        
        return { isLoggedIn: true, firstName, lastName };
      });
  },

  getInfosProfile: (data) => {
    return axios.post('http://localhost:3001/api/v1/user/profile', data)
      .then((res) => {
        
        let firstName = res.data.body.firstName;
        let lastName = res.data.body.lastName;
        console.log(firstName, lastName);
        return { isLoggedIn: true, firstName, lastName };
      });
  },

  updateProfile: (data) => {
    return axios.put('http://localhost:3001/api/v1/user/profile', data)
      .then((res) => {
        let actualFirstName = data.firstName;
        let actualLastName = data.lastName;
        console.log(res.data.body.firstName);
        
        let firstName = actualFirstName;
        let lastName = actualLastName;
        
        res.data.body.firstName = firstName;
        res.data.body.lastName = lastName;
        
       

        return {firstName, lastName}; // Return the success status of the update
      })
      .catch((err) => {
        console.log(err)

        console.log(data)
      })
  }
};

export function postLogin(data) {
  return axios
    .post('http://localhost:3001/api/v1/user/login', data)
    .then((res) => {
      const token = res.data.body.token; // Assuming the token is in the response data
      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      console.log(res.data.body.token);
      return { isLoggedIn: true, token };
    })
    .catch((err) => {
        const error = err.message + ' - Paire email / mot de passe incorrecte';
        console.log(data);
        return { isLoggedIn: false, error };
      })
}


export default ApiService;