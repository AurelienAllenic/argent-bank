import axios from 'axios';


const ApiService = {

    testApi: () => {
        return axios.get('http://localhost:3001/user/login');
    },

    postLogin: (data) => {
        console.log(data, 'isdata')
        let isLoggedIn = false;
        const url = `http://localhost:3001/login`;
        return axios.post(url, data).then((res) => {
            console.log('rentre')
           // On enregistre le token dans le localStorage
        localStorage.token = res.data.token;
        // Ajout du userId
        localStorage.userId = res.data.userId;
        // On "enregistre" le token dans la conf. de Axios
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
        // On "navigate" (redirige) vers '/my-posts'
        isLoggedIn = true;
        return {isLoggedIn}
      }).catch(err => {
        console.log('rentre pas')
        isLoggedIn = false;
        const error = err.message + ' - Paire email / mot de passe incorrecte';
        return {isLoggedIn, error}
      })
  }
}

export default ApiService