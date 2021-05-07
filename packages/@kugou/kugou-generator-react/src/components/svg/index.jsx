import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const SvgIcon = props => {
  const { iconClass, fill , className } = props;

  return (
    <i aria-hidden="true" className={`svg-icon ${className}`}>
      <svg className="svg">
        <use xlinkHref={"#icon-" + iconClass} fill={fill} />
      </svg>
    </i>
  );
};

SvgIcon.propTypes = {
  className : PropTypes.string,
  // svg名字
  iconClass: PropTypes.string.isRequired,
  // 填充颜色
  fill: PropTypes.string
};

SvgIcon.defaultProps = {
  fill: "currentColor"
};

export default SvgIcon;