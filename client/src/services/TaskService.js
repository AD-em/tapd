import axios from "axios";

const AxiosService = axios.create({
  // baseURL: 'http://localhost:/graphql',
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.HOSTNAME}/graphql`
      : "http://localhost:3000/graphql",
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
                    estimatedEndTime
                    actualEndTime
                    breakEndTime
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
                    estimatedEndTime
                    actualEndTime
                    breakEndTime
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
  saveTask(task) {
    return AxiosService.post("/", {
      query: `mutation CreateTask(
                $title: String!
                $description: String!
                $durationInMinutes: Int!
                $userId: ID!
                ){
                  createNewTask(newTaskParams:{
                    title: $title
                    description: $description
                    durationInMinutes: $durationInMinutes
                    userId: $userId
                  }){
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
      variables: {
        ...task,
        durationInMinutes: parseInt(task.durationInMinutes),
      },
    });
  },
};
