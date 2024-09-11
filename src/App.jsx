import React, { useState } from "react";
import { API_URL } from "./utils/constants";
import useApi from "./hooks/useApi";
import InputField from "./components/InputField"; // Import custom component
import Button from "./components/Button"; // Import custom component
import ResponseDisplay from "./components/ResponseDisplay"; // Import custom component
import { TailSpin } from "react-loader-spinner";

const App = () => {
  const [userId, setUserId] = useState({
    getId: "",
    postId: "",
    putId: "",
    patchId: "",
    deleteId: "",
  });
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    job_title: "",
  }); //Input Handle
  const [appId, setAppId] = useState({
    postAppId: "",
    putAppId: "",
    patchAppId: "",
    deleteAppId: "",
  });

  const { loading, data, error, makeRequest } = useApi(API_URL);

  const getUsers = () => makeRequest("get");

  const getUserById = () => {
    makeRequest("get", `${userId.getId}`);

    // Reset the getId field to an empty string
    setUserId((prevState) => ({
      ...prevState,
      getId: "",
    }));
  };

  const postUser = () => {
    makeRequest("post", "", newUser, {
      "Content-Type": "application/x-www-form-urlencoded",
      appid: appId.postAppId,
    });

    setNewUser({
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      job_title: "",
    });

    setAppId((prevState) => ({
      ...prevState,
      postAppId: "",
    }));
  };

  const putUser = () => {
    makeRequest("put", `${userId.putId}`, newUser, {
      "Content-Type": "application/x-www-form-urlencoded",
      appid: appId.putAppId,
    });
    setNewUser({
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      job_title: "",
    });
    setAppId((prevState) => ({
      ...prevState,
      putAppId: "",
    }));
  };

  const patchUser = () => {
    makeRequest("patch", `${userId.patchId}`, newUser, {
      "Content-Type": "application/x-www-form-urlencoded",
      appid: appId.patchAppId,
    });

    setNewUser({
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      job_title: "",
    });

    setAppId((prevState) => ({
      ...prevState,
      patchAppId: "",
    }));
  };

  const deleteUser = () => {
    makeRequest(
      "delete",
      `${userId.deleteId}`,
      {},
      {
        "Content-Type": "application/x-www-form-urlencoded",
        appid: appId,
      }
    );
    // Reset the getId field to an empty string
    setUserId((prevState) => ({
      ...prevState,
      deleteId: "",
    }));

    setAppId((prevState) => ({
      ...prevState,
      deleteAppId: "",
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">User API UI</h1>

        {/* Get All Users */}
        <div className="mb-6">
          <Button onClick={getUsers} color="bg-blue-500 hover:bg-blue-600">
            Get All Users
          </Button>
        </div>

        {/* Get User by ID */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Get User by ID</h2>
          <InputField
            value={userId.getId}
            onChange={(e) => setUserId({ ...userId, getId: e.target.value })}
            placeholder="User ID"
          />
          <Button onClick={getUserById} color="bg-green-500 hover:bg-green-600">
            Get User
          </Button>
        </div>

        {/* Create User */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Create User</h2>
          <InputField
            value={newUser.first_name}
            onChange={(e) =>
              setNewUser({ ...newUser, first_name: e.target.value })
            }
            placeholder="First Name"
          />
          <InputField
            value={newUser.last_name}
            onChange={(e) =>
              setNewUser({ ...newUser, last_name: e.target.value })
            }
            placeholder="Last Name"
          />
          <InputField
            value={newUser.gender}
            onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
            placeholder="Gender"
          />
          <InputField
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email"
            type="email"
          />
          <InputField
            value={newUser.job_title}
            onChange={(e) =>
              setNewUser({ ...newUser, job_title: e.target.value })
            }
            placeholder="Job Title"
          />
          <InputField
            value={appId.postAppId} // Set value to the specific field
            onChange={(e) =>
              setAppId((prevState) => ({
                ...prevState,
                postAppId: e.target.value, // Update the specific field
              }))
            }
            placeholder="API KEY"
          />
          <Button onClick={postUser} color="bg-blue-500 hover:bg-blue-600">
            Create User
          </Button>
        </div>

        {/* Update User (PUT) */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Update User (PUT)</h2>
          <InputField
            value={userId.patchId}
            onChange={(e) => setUserId({ ...userId, patchId: e.target.value })}
            placeholder="User ID"
          />
          <InputField
            value={newUser.first_name}
            onChange={(e) =>
              setNewUser({ ...newUser, first_name: e.target.value })
            }
            placeholder="First Name"
          />
          <InputField
            value={newUser.last_name}
            onChange={(e) =>
              setNewUser({ ...newUser, last_name: e.target.value })
            }
            placeholder="Last Name"
          />
          <InputField
            value={newUser.gender}
            onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
            placeholder="Gender"
          />
          <InputField
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email"
            type="email"
          />
          <InputField
            value={appId.putAppId} // Set value to the specific field
            onChange={(e) =>
              setAppId((prevState) => ({
                ...prevState,
                postAppId: e.target.value, // Update the specific field
              }))
            }
            placeholder="Job Title"
          />

          <Button onClick={putUser} color="bg-yellow-500 hover:bg-yellow-600">
            Update User
          </Button>
        </div>

        {/* Partial Update User (PATCH) */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Partial Update User (PATCH)
          </h2>
          <InputField
            value={userId.patchId}
            onChange={(e) => setUserId({ ...userId, patchId: e.target.value })}
            placeholder="User ID"
          />
          <InputField
            value={newUser.first_name}
            onChange={(e) =>
              setNewUser({ ...newUser, first_name: e.target.value })
            }
            placeholder="First Name"
          />
          <InputField
            value={newUser.last_name}
            onChange={(e) =>
              setNewUser({ ...newUser, last_name: e.target.value })
            }
            placeholder="Last Name"
          />
          <InputField
            value={newUser.gender}
            onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
            placeholder="Gender"
          />
          <InputField
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email"
            type="email"
          />
          <InputField
            value={newUser.job_title}
            onChange={(e) =>
              setNewUser({ ...newUser, job_title: e.target.value })
            }
            placeholder="Job Title"
          />
          <InputField
            value={appId.patchAppId} // Set value to the specific field
            onChange={(e) =>
              setAppId((prevState) => ({
                ...prevState,
                patchAppId: e.target.value, // Update the specific field
              }))
            }
            placeholder="API KEY"
          />
          <Button onClick={patchUser} color="bg-yellow-500 hover:bg-yellow-600">
            Partial Update User
          </Button>
        </div>

        {/* Delete User */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Delete User</h2>
          <InputField
            value={userId.deleteId}
            onChange={(e) => setUserId({ ...userId, deleteId: e.target.value })}
            placeholder="User ID"
          />
          <InputField
            value={appId.deleteAppId} // Set value to the specific field
            onChange={(e) =>
              setAppId((prevState) => ({
                ...prevState,
                deleteAppId: e.target.value, // Update the specific field
              }))
            }
            placeholder="API KEY"
          />
          <Button onClick={deleteUser} color="bg-red-500 hover:bg-red-600">
            Delete User
          </Button>
        </div>

        {/* Response Display */}
        <ResponseDisplay response={error || data} />
      </div>
    </div>
  );
};

export default App;
