import React from "react";

type propTypes = {
    children: JSX.Element;
};

const NonAuthLayout = (props: propTypes) => {
    return <React.Fragment>{props.children}</React.Fragment>;
};

export default NonAuthLayout;
