import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "./constant/base-urls";
import { loginAction } from "./redux/authReducer";

type UserDataReturnType = {
   
    fetchUser: () => void
};

export const UserData = (): UserDataReturnType => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    const generalStateShema: { fetching: boolean } = { fetching: true };
    const [generalState, setGeneralState] = useState(generalStateShema);

    let fetchUser = async () => {
        let res = await axios.get(`${BASE_URL}/admin-users/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (res.data.status === "success") {
            let user = {
                id: res.data.data._id as number,
                email: res.data.data.email as string,
                mobileNumber: res.data.data.mobileNumber as string,
                fullname: res.data.data.fullname as string,
                country: res.data.data.country as string,
                isAdmin: res.data.data.isAdmin as boolean,
                role: res.data.data.role as string,
            };


            let token = res.data.token as string

            dispatch(
                loginAction({
                    auth_token: token,
                    ...user,
                })
            );
            setGeneralState((state) => ({ ...state, fetching: false }));
        } else {
            setGeneralState((state) => ({ ...state, fetching: false }));
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return {fetchUser};
};
