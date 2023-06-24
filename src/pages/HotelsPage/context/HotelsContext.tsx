import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import QueryString from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../constant/base-urls";


type HotelsReturnType = {
    hotelsData: hotelsDataInterface;
    clearState: () => void;
    initializeState: () => void;
    currentPage: number;
    submitHotelsFilter: () => void;
    hotelsFormState: hotelsFilterForm;
    setHotelsFormState: Dispatch<SetStateAction<hotelsFilterForm>>;
    paramId: string;
    fetchStatus: string;
    setFetchStatus: Dispatch<SetStateAction<string>>;
    queryState: queryStateInterface
}

const HotelsContext = createContext<HotelsReturnType | null>(null);

interface hotelsDataType {
    _id: string;
    name: string;
    price: string;
    destination: string;
    created_at: string;
}

interface hotelsFilterForm {
    name: string;
    destination: string;
}

interface hotelsDataInterface {
    pages?: number;
    responseData: hotelsDataType[];
    fetching: boolean;
    query: string;
}

interface queryStateInterface {
    query: string;
}

const HotelsProvider = ({ children }: any) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [fetchStatus, setFetchStatus] = useState("idle")

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

    const hotelsDataTableSchema: hotelsDataInterface = {
        responseData: [],
        fetching: true,
        query: "",
    }

    let queryStateSchema: queryStateInterface = {
        query: "",
    };

    const hotelsFilterformSchema: hotelsFilterForm = {
        name: "",
        destination: ""
    }

    const [hotelsFormState, setHotelsFormState] = useState(hotelsFilterformSchema)

    const [queryState, setQueryState] = useState(queryStateSchema)

    const [hotelsData, setHotelsData] = useState(hotelsDataTableSchema)

    const fetchHotelsData = async () => {
        setFetchStatus("pending")
        let queryString = "";
        let name = urlQuery.name?.toString() ?? "";
        let destination = urlQuery.destination?.toString() ?? "";

        if (
            name !== "" ||
            destination !== ""
        ) {
            queryString = `name=${name}&destination=${destination}`
        }

        setQueryState((state: queryStateInterface) => {
            return {
                ...state, query: queryString
            }
        })

        let query = `page=${currentPage}&${queryString}`;

        let response: any;
        response = await axios.get(`${BASE_URL}/hotels/admin?${query}`).then((data) => {
            if (data.data.status === "success") {
                let pages = Math.ceil(data?.data?.total / data?.data?.per_page);
                setHotelsData((state) => ({
                    ...state,
                    responseData: data?.data?.data,
                    fetching: false,
                    pages: pages
                }))
            } else {
                setHotelsData((state) => ({
                    ...state,
                    fetching: false,
                }))
            }
        }).catch((err) => {
            console.log(err);
            setHotelsData((state) => ({
                ...state,
                fetching: false,
            }))
        })

    }

    let initializeState = () => {
        fetchHotelsData();
        clearState();
    }

    let clearState = () => {
        setHotelsData((state) => ({
            ...state,
            ...hotelsDataTableSchema
        }))
        setHotelsFormState((state) => ({
            ...state,
            ...hotelsFilterformSchema
        }))
    }

    let submitHotelsFilter = () => {
        setFetchStatus("idle")
        let query = `name=${hotelsFormState?.name}&destination=${hotelsFormState?.destination}`;

        let url = `/hotels?${query}`

        setQueryState((state) => {
            return { ...state, query };
        });
        navigate(url);
    };

    return (
        <HotelsContext.Provider value={{
            initializeState,
            hotelsData,
            clearState,
            currentPage,
            submitHotelsFilter,
            hotelsFormState,
            setHotelsFormState,
            paramId,
            fetchStatus,
            setFetchStatus,
            queryState
        }}>{children}</HotelsContext.Provider>
    )
};

export const useHotelsContext = () => useContext(HotelsContext) as HotelsReturnType
export default HotelsProvider;
