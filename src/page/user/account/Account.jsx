import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../context/user/UserAction';
import Button from '../../../ui/shared/Button';
import Input from '../../../ui/shared/Input';
import Logo from '../../../assets/Logo.png'

export default function Account() {
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState(false);
    const [inputData, setInputData] = useState({
      username:"",
      indentity : "",
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
  
    const handleLogOut = async (e) => {
      e.preventDefault();
      const response = await logout();
      if (response) {
        navigate("/")
      }
    };
  
    return (
      <div className="border-2 rounded-xl md:w-full">
          <div className="flex flex-col justify-between p-5">
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-xl font-bold tracking-tight text-gray-900">
                My Profile
              </span>
              <Button
                customClass="bg-red-500 text-white"
                type="button"
                onClick={handleLogOut}
              >
                Log out
              </Button>
            </div>
            <hr className="h-px my-5 bg-gray-500" />
            <form
            //   onSubmit={handleEdit}
              className="flex gap-5 flex-col justify-evenly items-center md:flex-row"
            >
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
                    <span>{"panha@gmail.com"}</span>
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
                    <span>{"panha"}</span>
                  )}
                </div>
  
                <div className="flex flex-col">
                  <p className="font-bold tracking-tight text-gray-900">
                    Identity
                  </p>
                  {isEdit ? (
                    <Input
                      type="text"
                      id="phoneNumber"
                      style="px-3 py-1 border-1 rounded-md bg-slate-200"
                      onChange={onTextChange}
                    />
                  ) : (
                    <span>{"student"}</span>
                  )}
                </div>
                {isEdit && (
                  <Button customClass="bg-[#283d50] text-white" type="submit">
                    Save
                  </Button>
                )}
              </div>
            </form>
          </div>
      </div>
    );
}
