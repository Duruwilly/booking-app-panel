import { AiOutlineUserDelete } from "react-icons/ai"
import { BiTransfer } from "react-icons/bi"
import { MdOutlinePlaylistAddCheck } from "react-icons/md"
import { IoMdNotificationsOutline } from "react-icons/io"

export interface sidebarContentInterface {
    title: string;
    icon: any;
    id: number;
    content: { text: string; path: string }[]
}

type propType = {
    isAdmin: boolean | null,
    role: string | null
}

export const sidebarContentFile = ({ isAdmin, role }: propType) => {

    const sidebarContent = isAdmin ? [
        {
            title: "users",
            icon: <AiOutlineUserDelete />,
            id: 1,
            content: [
                {
                    text: "all users", path: "/users"
                },
                {
                    text: "regular", path: "/users/regular"
                },
                {
                    text: "merchant", path: "/users/merchant"
                },
                ...(isAdmin ? [{
                    text: "admin users", path: "/users/admin-users"
                }] : []),
                ...(isAdmin ? [{ text: "create", path: "/users/create" }] : []),
            ],
        },
        {
            title: "transactions",
            icon: <BiTransfer />,
            id: 2,
            content: [
                {
                    text: "all transactions", path: "/transactions"
                },
                {
                    text: "failed", path: "/transactions/failed"
                },
                {
                    text: "successful", path: "/transactions/successful"
                },
                {
                    text: "pending", path: "/transactions/pending"
                },
                {
                    text: "cancelled", path: "/transactions/cancelled"
                }
            ]
        },
        {
            title: "bookings",
            icon: <BiTransfer />,
            id: 3,
            content: [
                {
                    text: "all bookings", path: "/bookings"
                },
            ]
        },
        {
            title: "hotel listing",
            icon: <MdOutlinePlaylistAddCheck />,
            id: 4,
            content: [
                {
                    text: "all hotels", path: "/hotels"
                },
                {
                    text: "create", path: "hotels/create",
                },
            ]
        },
        {
            title: "notification",
            icon: <IoMdNotificationsOutline />,
            id: 5,
            content: [
                {
                    text: "notifications", path: "/notifications"
                }
            ]
        }
    ] : role === "frontDesk" ? [
        {
            title: "bookings",
            icon: <BiTransfer />,
            id: 3,
            content: [
                {
                    text: "all bookings", path: "/bookings"
                },
            ]
        },
    ] : role === "support" ? [
        {
            title: "users",
            icon: <AiOutlineUserDelete />,
            id: 1,
            content: [
                {
                    text: "all users", path: "/users"
                },
                {
                    text: "regular", path: "/users/regular"
                },
                {
                    text: "merchant", path: "/users/merchant"
                },
            ],
        },
        {
            title: "transactions",
            icon: <BiTransfer />,
            id: 2,
            content: [
                {
                    text: "all transactions", path: "/transactions"
                },
                {
                    text: "failed", path: "/transactions/failed"
                },
                {
                    text: "successful", path: "/transactions/successful"
                },
                {
                    text: "pending", path: "/transactions/pending"
                },
                {
                    text: "cancelled", path: "/transactions/cancelled"
                }
            ]
        },
    ] : []

    return { sidebarContent }
}

// export const sidebarContent = [
//     {
//         title: "users",
//         icon: <AiOutlineUserDelete />,
//         id: 1,
//         content: [
//             {
//                 text: "all users", path: "/users"
//             },
//             {
//                 text: "regular", path: "/users/regular"
//             },
//             {
//                 text: "merchant", path: "/users/merchant"
//             },
//             ...(isAdmin ? [{
//                 text: "admin users", path: "/users/admin-users"
//             }] : []),
//             ...(isAdmin ? [{ text: "create", path: "/users/create" }] : []),
//         ],
//     },
//     {
//         title: "transactions",
//         icon: <BiTransfer />,
//         id: 2,
//         content: [
//             {
//                 text: "all transactions", path: "/transactions"
//             },
//             {
//                 text: "failed", path: "/transactions/failed"
//             },
//             {
//                 text: "successful", path: "/transactions/successful"
//             },
//             {
//                 text: "pending", path: "/transactions/pending"
//             },
//             {
//                 text: "cancelled", path: "/transactions/cancelled"
//             }
//         ]
//     },
//     {
//         title: "bookings",
//         icon: <BiTransfer />,
//         id: 3,
//         content: [
//             {
//                 text: "all bookings", path: "/bookings"
//             },
//         ]
//     },
//     {
//         title: "hotel listing",
//         icon: <MdOutlinePlaylistAddCheck />,
//         id: 4,
//         content: [
//             {
//                 text: "all hotels", path: "/hotels"
//             },
//             {
//                 text: "create", path: "hotels/create",
//             },
//         ]
//     },
//     {
//         title: "notification",
//         icon: <IoMdNotificationsOutline />,
//         id: 5,
//         content: [
//             {
//                 text: "notifications", path: "/notifications"
//             }
//         ]
//     }
// ]