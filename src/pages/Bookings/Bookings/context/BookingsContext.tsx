import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import QueryString from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../constant/base-urls";


type BookingsType = {
    bookingsData: bookingsInterface;
    clearState: () => void;
    initializeState: () => void;
    currentPage: number;
    submitBookingsFilter: () => void;
    bookingsFormState: bookingsFilterForm;
    setBookingsFormState: Dispatch<SetStateAction<bookingsFilterForm>>;
    paramId: string;
    fetchStatus: string;
    setFetchStatus: Dispatch<SetStateAction<string>>;
    queryState: queryStateInterface
}

const BookingsContext = createContext<BookingsType | null>(null);

interface bookingsDataType {
    _id: string;
    bookingNumber: string;
    lastName: string;
    firstName: string;
    RoomTitle: string;
    RoomNumber: string;
    HotelName: string;
    mobileNumber: string;
    createdAt: string;
    status: string
}

interface bookingsFilterForm {
    bookingNumber: string
}

interface bookingsInterface {
    pages?: number;
    responseData: bookingsDataType[];
    fetching: boolean;
    query: string;
}

interface queryStateInterface {
    query: string;
}

const BookingsProvider = ({ children }: any) => {
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

    const bookingsDataTableSchema: bookingsInterface = {
        responseData: [],
        fetching: true,
        query: "",
    }

    let queryStateSchema: queryStateInterface = {
        query: "",
    };

    const bookingsFilterformSchema: bookingsFilterForm = {
        bookingNumber: ""
    }

    const [bookingsFormState, setBookingsFormState] = useState(bookingsFilterformSchema)

    const [queryState, setQueryState] = useState(queryStateSchema)

    const [bookingsData, setbookingsData] = useState(bookingsDataTableSchema)

    const fetchbookingsData = async () => {
        setFetchStatus("pending")
        let queryString = "";
        let bookingNumber = urlQuery.bookingNumber?.toString() ?? "";

        if (
            bookingNumber !== ""
        ) {
            queryString = `bookingNumber=${bookingNumber}`
        }

        setQueryState((state: queryStateInterface) => {
            return {
                ...state, query: queryString
            }
        })

        let query = `page=${currentPage}&${queryString}`;

        let response: any;
        response = await axios.get(`${BASE_URL}/transactions/bookings?${query}`).then((data) => {
            if (data.data.status === "success") {
                let pages = Math.ceil(data?.data?.total / data?.data?.per_page);
                setbookingsData((state) => ({
                    ...state,
                    responseData: data?.data?.data,
                    fetching: false,
                    pages: pages
                }))
            } else {
                setbookingsData((state) => ({
                    ...state,
                    fetching: false,
                }))
            }
        }).catch((err) => {
            console.log(err);
            setbookingsData((state) => ({
                ...state,
                fetching: false,
            }))
        })

    }

    let initializeState = () => {
        fetchbookingsData();
        clearState();
    }

    let clearState = () => {
        setbookingsData((state) => ({
            ...state,
            ...bookingsDataTableSchema
        }))
        setBookingsFormState((state) => ({
            ...state,
            ...bookingsFilterformSchema
        }))
    }

    let submitBookingsFilter = () => {
        setFetchStatus("idle")
        let query = `bookingNumber=${bookingsFormState?.bookingNumber}`;

        let url = `/bookings?${query}`
        // (paramId && paramId !== "" ? `/bookings/${paramId}` : "/bookings") +
        // "?" +
        // query;
        setQueryState((state) => {
            return { ...state, query };
        });
        navigate(url);
    };

    return (
        <BookingsContext.Provider value={{
            initializeState,
            bookingsData,
            clearState,
            currentPage,
            submitBookingsFilter,
            bookingsFormState,
            setBookingsFormState,
            paramId,
            fetchStatus,
            setFetchStatus,
            queryState
        }}>{children}</BookingsContext.Provider>
    )
};

export const useBookingsContext = () => useContext(BookingsContext) as BookingsType
export default BookingsProvider;
