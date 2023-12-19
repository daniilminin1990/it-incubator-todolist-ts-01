import React from "react";

type ButtonPropsType = {
  title: string;
  onClickHandler?: () => void;
  isDisabled?: boolean
};

const Button = (props: ButtonPropsType) => {
  return <button
    disabled={props.isDisabled}
    onClick={props.onClickHandler}>{props.title}</button>;
};

export default Button;
