import axios from 'axios';

const AxiosService = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getTasks() {
    return AxiosService.post('/graphql', {
      query: `{
                getAllTasks {
                    id
                    created_at
                    title
                    description
                    done
                    startTime
                    estimatedEndTime
                    actualEndTime
                    breakEndTime
                }
            }`
    });
  },
  getTask(id) {
    return AxiosService.post('/graphql', {
      query: `query GetTask($id: ID){
                getTask(id: $id) {
                    id
                    created_at
                    title
                    description
                    done
                    startTime
                    estimatedEndTime
                    actualEndTime
                    breakEndTime
                }
            }`,
      variables: { id: Number(id) }
    });
  },
  signin() {
    return AxiosService.post('/graphql', {
      query: `mutation {
            signin(
                signInParams: { 
                    email: "dev@", 
                    password: "111" 
                }) {
                        email
              }
          }`
    });
  }
};
