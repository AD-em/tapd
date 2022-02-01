import axios from "axios";

const AxiosService = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.HOSTNAME}/graphql`
      : "http://localhost:1881/graphql",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getTasks() {
    return AxiosService.post("/", {
      query: `{
                getAllTasks {
                    id
                    created_at
                    title
                    description
                    done
                    startTime
                    durationInMinutes
                    estimatedDurationInMinutes
                    breakDurationInMinutes
                }
            }`,
    });
  },
  getTask(id) {
    return AxiosService.post("/", {
      query: `query GetTask($id: ID){
                getTask(id: $id) {
                    id
                    created_at
                    title
                    description
                    done
                    startTime
                    durationInMinutes
                    estimatedDurationInMinutes
                    breakDurationInMinutes
                }
            }`,
      variables: { id: Number(id) },
    });
  },
  signin(email, password) {
    return AxiosService.post("/", {
      query: `mutation signin(
        $email: String!, 
        $password: String!
        ) {
        signin(signInParams: { email: $email, password: $password }) {
          id
          email
        }
      }`,
      variables: {
        email,
        password,
      },
    });
  },
  signout(){
    return AxiosService.post('/' ,{
      query: `mutation { signout }`
    })
  },
  saveTask(task) {
    return AxiosService.post("/", {
      query: `mutation CreateTask(
                $title: String!
                $description: String!
                $estimatedDurationInMinutes: Int!
                $userId: ID!
                ){
                  createNewTask(newTaskParams:{
                    title: $title
                    description: $description
                    estimatedDurationInMinutes: $estimatedDurationInMinutes
                    userId: $userId
                  }){
                    id
                    created_at
                    title
                    description
                    done
                    startTime
                    estimatedDurationInMinutes
                    breakDurationInMinutes
                  }
                }`,
      variables: {
        ...task,
        estimatedDurationInMinutes: parseInt(task.estimatedDurationInMinutes),
      },
    });
  },
};
