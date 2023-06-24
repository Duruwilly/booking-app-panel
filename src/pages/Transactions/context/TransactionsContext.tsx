import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import QueryString from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../constant/base-urls";


type TransactionsType = {
    transactionsData: transactionsInterface;
    clearState: () => void;
    initializeState: () => void;
    currentPage: number;
    submitTransactionsFilter: () => void;
    transactionsFormState: transactionsFilterForm;
    setTransactionsFormState: Dispatch<SetStateAction<transactionsFilterForm>>;
    paramId: string;
    fetchStatus: string;
    setFetchStatus: Dispatch<SetStateAction<string>>;
    queryState: queryStateInterface;
    fetchTransactionsData: () => void
}

const TransactionsContext = createContext<TransactionsType | null>(null);

interface transactionsDataType {
    _id: string;
    transaction_id: string;
    reference_id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    mobileNumber: string;
    createdAt: string
}

interface transactionsFilterForm {
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    transaction_id: string;
    reference_id: string;
}

interface transactionsInterface {
    pages?: number;
    responseData: transactionsDataType[];
    fetching: boolean;
    query: string;
}

interface queryStateInterface {
    query: string;
}

const TransactionsProvider = ({ children }: any) => {
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

    const transactionsDataTableSchema: transactionsInterface = {
        responseData: [],
        fetching: true,
        query: "",
    }

    let queryStateSchema: queryStateInterface = {
        query: "",
    };

    const transactionsFilterformSchema: transactionsFilterForm = {
        firstName: "",
        lastName: "",
        email: "",
        status: "",
        transaction_id: "",
        reference_id: ""
    }

    const [transactionsFormState, setTransactionsFormState] = useState(transactionsFilterformSchema)

    const [queryState, setQueryState] = useState(queryStateSchema)

    const [transactionsData, setTransactionsData] = useState(transactionsDataTableSchema)

    const fetchTransactionsData = async () => {
        setFetchStatus("pending")
        let queryString = "";
        let firstName = urlQuery.firstName?.toString() ?? "";
        let lastName = urlQuery.lastName?.toString() ?? "";
        let email = urlQuery?.email?.toString() ?? "";
        let transaction_id = urlQuery.transaction_id?.toString() ?? "";
        let reference_id = urlQuery.reference_id?.toString() ?? "";
        let status = urlQuery.status?.toString() ?? ""

        if (
            firstName !== "" ||
            lastName !== "" ||
            email !== "" ||
            transaction_id !== "" ||
            reference_id !== "" ||
            status !== ""
        ) {
            queryString = `firstName=${firstName}&lastName=${lastName}&email=${email}&transaction_id=${transaction_id}&reference_id=${reference_id}&status=${status}`
        }

        setQueryState((state: queryStateInterface) => {
            return {
                ...state, query: queryString
            }
        })

        let query = `page=${currentPage}&${queryString}`;

        let response: any;

        if (paramId !== "") {
            response = axios.get(`${BASE_URL}/transactions/status-type/${paramId}?${query}`).then((data) => {
                if (data.data.status === "success") {
                    let pages = Math.ceil(data?.data.total / data?.data?.per_page);
                    setTransactionsData((state) => ({
                        ...state,
                        responseData: data?.data?.data,
                        fetching: false,
                        pages: pages
                    }))
                } else {
                    setTransactionsData((state) => ({
                        ...state,
                        fetching: false,
                    }))
                }
            }).catch((err) => {
                console.log(err);
                setTransactionsData((state) => ({
                    ...state,
                    fetching: false,
                }))
            })

        } else {
            response = await axios.get(`${BASE_URL}/transactions?${query}`).then((data) => {
                if (data.data.status === "success") {
                    let pages = Math.ceil(data?.data?.total / data?.data?.per_page);
                    setTransactionsData((state) => ({
                        ...state,
                        responseData: data?.data?.data,
                        fetching: false,
                        pages: pages
                    }))
                } else {
                    setTransactionsData((state) => ({
                        ...state,
                        fetching: false,
                    }))
                }
            }).catch((err) => {
                console.log(err);
                setTransactionsData((state) => ({
                    ...state,
                    fetching: false,
                }))
            })
        }

    }

    let initializeState = () => {
        fetchTransactionsData();
        clearState();
    }

    let clearState = () => {
        setTransactionsData((state) => ({
            ...state,
            ...transactionsDataTableSchema
        }))
        setTransactionsFormState((state) => ({
            ...state,
            ...transactionsFilterformSchema
        }))
    }

    let submitTransactionsFilter = () => {
        setFetchStatus("idle")
        let query = `firstName=${transactionsFormState?.firstName}&lastName=${transactionsFormState.lastName}&email=${transactionsFormState?.email}&transaction_id=${transactionsFormState?.transaction_id}&reference_id=${transactionsFormState.reference_id}&status=${transactionsFormState?.status}`;

        let url =
            (paramId && paramId !== "" ? `/transactions/${paramId}` : "/transactions") +
            "?" +
            query;
        setQueryState((state) => {
            return { ...state, query };
        });
        navigate(url);
    };

    return (
        <TransactionsContext.Provider value={{
            initializeState,
            transactionsData,
            clearState,
            currentPage,
            submitTransactionsFilter,
            transactionsFormState,
            setTransactionsFormState,
            paramId,
            fetchStatus,
            setFetchStatus,
            queryState,
            fetchTransactionsData
        }}>{children}</TransactionsContext.Provider>
    )
};

export const useTransactionsContext = () => useContext(TransactionsContext) as TransactionsType
export default TransactionsProvider;
