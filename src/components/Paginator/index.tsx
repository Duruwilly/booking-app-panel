import React, { Dispatch, SetStateAction } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

export const Paginator = ({ currentPage, pages, url, query, setFetchStatus, paramId }: {
    currentPage?: number;
    pages?: number;
    url: string;
    query: string;
    paramId: string
    setFetchStatus: Dispatch<SetStateAction<string>>
}) => {
    let links = [];
    currentPage = Number(currentPage);
    pages = Number(pages);

    if (currentPage && pages) {
        if (pages > 7) {
            if (currentPage - 4 > 0) {
                if (currentPage - 7 > 2) {
                    links.push(1);
                    links.push(2);
                    links.push("....");
                }
                for (let i = currentPage - 4; i < currentPage; i++) {
                    links.push(i);
                }
            } else {
                for (let i = 1; i < currentPage; i++) {
                    links.push(i);
                }
            }
            links.push(currentPage);

            if (currentPage + 3 < pages) {
                links.push(currentPage + 1);
                links.push(currentPage + 2);
                links.push(currentPage + 3);
            } else {
                for (let i = currentPage + 1; i <= pages; i++) {
                    links.push(i);
                }
            }

            if (pages > currentPage + 7) {
                links.push("....");
                for (let i = pages - 2; i <= pages; i++) {
                    links.push(i);
                }
            } else {
                for (let i = currentPage + 4; i <= pages; i++) {
                    links.push(i);
                }
            }
        } else {
            for (let i = 1; i <= pages; i++) {
                links.push(i);
            }
        }
        return (
            <>
                {currentPage > 1 ? (
                    <li className="previous" onClick={() => setFetchStatus("idle")}>
                        <Link
                            to={
                                `${(paramId && paramId !== "" ? `${url}/${paramId}` : url)}?${query === "" ? "" : `${query}`}&page=${currentPage - 1}`

                                // url +
                                // "?page=" +
                                // (currentPage - 1) +
                                // (query === "" ? "" : "&" + query)
                            }
                        >
                            <SlArrowLeft className="inline text-xl" />
                        </Link>
                    </li>
                ) : (
                    <li
                        className="disabled previous" onClick={() => setFetchStatus("idle")}
                    >
                        <a>
                            <SlArrowLeft className="inline text-xl" />
                        </a>
                    </li>
                )}
                {links.map((link) => {
                    if (link === currentPage) {
                        return (
                            <li
                                key={currentPage}
                                className="active" onClick={() => setFetchStatus("idle")}
                            >
                                <a>{currentPage}</a>
                            </li>
                        );
                    } else if (link === "....") {
                        return (
                            <li key="...." className="disabled">
                                <a>.....</a>
                            </li>
                        );
                    } else {
                        let constr = `${(paramId && paramId !== "" ? `${url}/${paramId}` : url)}?${query === "" ? "" : `${query}`}&page=${link}`;
                        // url + "?page=" + link + (query === "" ? "" : "&" + query);

                        return (
                            <li key={link} onClick={() => setFetchStatus("idle")}>
                                <Link to={constr}>{link}</Link>
                            </li>
                        );
                    }
                })}
                {currentPage < pages ? (
                    <li className="next" onClick={() => setFetchStatus("idle")}>
                        <Link
                            to={
                                `${(paramId && paramId !== "" ? `${url}/${paramId}` : url)}?${query === "" ? "" : `${query}`}&page=${currentPage + 1}`
                                // url +
                                // "?page=" +
                                // (currentPage + 1) +
                                // (query === "" ? "" : "&" + query)
                            }
                        >
                            <SlArrowRight className="inline text-xl" />
                        </Link>
                    </li>
                ) : (
                    <li
                        className="disabled next" onClick={() => setFetchStatus("idle")}
                    >
                        <a>
                            <SlArrowRight className="inline text-2xl" />
                        </a>
                    </li>
                )}
            </>
        );
    }
    return null;
};
