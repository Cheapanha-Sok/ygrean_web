import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUser, getUser, logOut } from "../../../context/user/UserAction";
import Button from "../../../ui/shared/Button";
import Input from "../../../ui/shared/Input";
import Logo from "../../../assets/Logo.png";
import UserDataContext from "../../../context/user/UserContext";

export default function Account() {

  const navigate = useNavigate()
  const { dispatch, currentUser, loading } = useContext(UserDataContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await logOut();
    if(res){
      navigate("/")
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const data = await getUser();
      dispatch({ type: "SET_USER", payload: data });
    };
    fetchCurrentUser();
  }, [dispatch]);

  const [isEdit, setIsEdit] = useState(false);
  const [inputData, setInputData] = useState({
    username: "",
    identity: "",
    userImage: "",
  });

  const onTextChange = (e) => {
    const { id, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setInputData((prevState) => ({
      ...prevState,
      userImage: file,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const { username, identity } = inputData;
    const res = await editUser(currentUser.id, username, identity);
  };


  if (currentUser === null) {
    navigate("authentication")
  }

  return (
    <>
      {currentUser && (
        <div className="border-2 rounded-xl md:w-full">
          <div className="flex flex-col justify-between p-5">
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-xl font-bold tracking-tight text-gray-900">
                My Profile
              </span>
              <Button
                customClass="bg-red-500 text-white"
                type="button"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </div>
            <hr className="h-px my-5 bg-gray-500" />
            <form className="flex gap-5 flex-col justify-evenly items-center md:flex-row">
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden">
                  <img
                    src={Logo}
                    alt="Bordered avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
                {isEdit && (
                  <Input
                    type="file"
                    id="userImage"
                    style="rounded-md bg-slate-200"
                    onChange={onFileChange}
                    accept="image/*"
                  />
                )}
                <Button onClick={() => setIsEdit(!isEdit)} type="button">
                  <img src={""} alt="editBtn" className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex flex-col gap-2 md:gap-5">
                <div className="flex flex-col">
                  <p className="font-bold tracking-tight text-gray-900">
                    Email
                  </p>
                  {isEdit ? (
                    <Input
                      type="text"
                      id="username"
                      style="px-3 py-1 border-1 rounded-md bg-slate-200"
                      onChange={onTextChange}
                    />
                  ) : (
                    <span>{currentUser.email}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="font-bold tracking-tight text-gray-900">
                    User name
                  </p>
                  {isEdit ? (
                    <Input
                      type="text"
                      id="username"
                      style="px-3 py-1 border-1 rounded-md bg-slate-200"
                      onChange={onTextChange}
                    />
                  ) : (
                    <span>{currentUser.name}</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <p className="font-bold tracking-tight text-gray-900">
                    Identity
                  </p>
                  {isEdit ? (
                    <Input
                      type="text"
                      id="identity"
                      style="px-3 py-1 border-1 rounded-md bg-slate-200"
                      onChange={onTextChange}
                    />
                  ) : (
                    <span>
                      {currentUser.isGraduate ? "Graduate" : "Under Graduate"}
                    </span>
                  )}
                </div>
                {isEdit && (
                  <Button
                    customClass="bg-[#283d50] text-white"
                    type="submit"
                    onClick={handleEdit}
                  >
                    Save
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
