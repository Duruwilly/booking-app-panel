import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import QueryString from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../constant/base-urls";


type UsersType = {
   usersData: usersInterface;
   clearState: () => void;
   initializeState: () => void;
   currentPage: number;
   submitUsersFilter: () => void;
   usersFormState: usersFilterForm;
   setUsersFormState: Dispatch<SetStateAction<usersFilterForm>>;
   paramId: string;
   fetchStatus: string;
   setFetchStatus: Dispatch<SetStateAction<string>>;
   queryState: queryStateInterface;
   usersSelectedRow: selectedUserType;
   setUsersSelectedRow: Dispatch<SetStateAction<selectedUserType>>;
   toggleEditUserModal: () => void;
   editUserModal: boolean
}

const UsersContext = createContext<UsersType | null>(null);

interface usersDataType {
   _id: string;
   fullname: string;
   email: string;
   country: string;
   role: string;
   mobileNumber: string;
   createdAt: string
}

interface usersFilterForm {
   fullname: string;
   email: string;
   country: string;
   role: string;
}

interface usersInterface {
   pages?: number;
   responseData: usersDataType[];
   fetching: boolean
   query: string
}

interface queryStateInterface {
   query: string;
}

interface selectedUserType {
   _id: string;
   fullname: string;
   email: string;
   mobileNumber: string;
   country: string;
   role: string;
   gender: string;
   password: string
}

const UsersProvider = ({ children }: any) => {
   const location = useLocation()
   const navigate = useNavigate()
   // look into this QueryString
   let urlQuery = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
   });

   let paramId: string = "";
   const urlSplit = location.pathname.split("/");
   if (urlSplit.length > 2) {
      paramId = urlSplit[2];
   }

   let page = urlQuery.page ?? 1;
   let currentPage: number = Number(page);

   const usersDataTableSchema: usersInterface = {
      responseData: [],
      fetching: true,
      query: ""
   }

   let queryStateSchema: queryStateInterface = {
      query: "",
   };

   const usersFilterformSchema: usersFilterForm = {
      fullname: "",
      email: "",
      country: "",
      role: ""
   }

   const selectedUserFormSchema: selectedUserType = {
      _id: "",
      fullname: "",
      email: "",
      mobileNumber: "",
      country: "",
      role: "",
      gender: "",
      password: ""
      
   }

   const [queryState, setQueryState] = useState(queryStateSchema)

   const [usersFormState, setUsersFormState] = useState(usersFilterformSchema)

   const [usersData, setUsersData] = useState(usersDataTableSchema)

   const [fetchStatus, setFetchStatus] = useState("idle")

   const [editUserModal, setEditUserModal] = useState(false)

   const [usersSelectedRow, setUsersSelectedRow] = useState(selectedUserFormSchema)

   const fetchUsers = async () => {
      setFetchStatus("pending")
      let queryString = "";
      let fullname = urlQuery.fullname?.toString() ?? "";
      let email = urlQuery?.email?.toString() ?? "";
      let country = urlQuery.country?.toString() ?? "";
      let role = urlQuery.role?.toString() ?? ""

      if (
         fullname !== "" ||
         email !== "" ||
         country !== "" ||
         role !== ""
      ) {
         queryString = `fullname=${fullname}&email=${email}&country=${country}&role=${role}`
      }

      setQueryState((state: queryStateInterface) => {
         return {
            ...state, query: queryString
         }
      })

      let query = `page=${currentPage}&${queryString}`;

      let response: any;

      if (paramId === "admin-users") {
         response = axios.get(`${BASE_URL}/admin-users?${query}`).then((data) => {
            if (data.data.status === "success") {
               let pages = Math.ceil(data?.data?.total / data?.data?.per_page);
               setUsersData((state) => ({
                  ...state,
                  responseData: data?.data?.data,
                  fetching: false,
                  pages: pages
               }))
            } else {
               setUsersData((state) => ({
                  ...state,
                  fetching: false,
               }))
            }
         }).catch((err) => {
            console.log(err);
            setUsersData((state) => ({
               ...state,
               fetching: false,
            }))
         })
      } else if (paramId !== "") {
         response = axios.get(`${BASE_URL}/users/user-type/${paramId}?${query}`).then((data) => {
            if (data.data.status === "success") {
               let pages = Math.ceil(data?.data?.total / data?.data?.per_page);
               setUsersData((state) => ({
                  ...state,
                  responseData: data?.data?.data,
                  fetching: false,
                  pages: pages
               }))
            } else {
               setUsersData((state) => ({
                  ...state,
                  fetching: false,
               }))
            }
         }).catch((err) => {
            console.log(err);
            setUsersData((state) => ({
               ...state,
               fetching: false,
            }))
         })

      } else {
         response = await axios.get(`${BASE_URL}/users?${query}`).then((data) => {
            if (data.data.status === "success") {
               let pages = Math.ceil(data?.data?.total / data?.data?.per_page);
               setUsersData((state) => ({
                  ...state,
                  responseData: data?.data?.data,
                  fetching: false,
                  pages: pages
               }))
            } else {
               setUsersData((state) => ({
                  ...state,
                  fetching: false,
               }))
            }
         }).catch((err) => {
            console.log(err);
            setUsersData((state) => ({
               ...state,
               fetching: false,
            }))
         })
      }

   }

   const toggleEditUserModal = () => {
      setEditUserModal(!editUserModal);
   };

   let initializeState = () => {
      fetchUsers();
      clearState();
   }

   let clearState = () => {
      setUsersData((state) => ({
         ...state,
         ...usersDataTableSchema
      }))
      setUsersFormState((state) => ({
         ...state,
         ...usersFilterformSchema
      }))
   }

   let submitUsersFilter = () => {
      setFetchStatus("idle")
      let query = `fullname=${usersFormState?.fullname}&email=${usersFormState?.email}&country=${usersFormState?.country}&role=${usersFormState?.role}`;

      let url =
         (paramId && paramId !== "" ? `/users/${paramId}` : "/users") +
         "?" +
         query;
      setQueryState((state) => {
         return { ...state, query };
      });
      navigate(url);
   };

   return (
      <UsersContext.Provider value={{
         initializeState,
         usersData,
         clearState,
         currentPage,
         submitUsersFilter,
         usersFormState,
         setUsersFormState,
         paramId,
         fetchStatus,
         setFetchStatus,
         queryState,
         usersSelectedRow,
         setUsersSelectedRow,
         toggleEditUserModal,
         editUserModal
      }}>{children}</UsersContext.Provider>
   )
};

export const useUsersContext = () => useContext(UsersContext) as UsersType
export default UsersProvider;
