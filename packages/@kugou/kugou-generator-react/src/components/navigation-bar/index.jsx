import React, { useState, useEffect } from "react";
import "./index.scss";

export default function NavigationBar(props) {
  const { title, showback, backClick } = props;
  const [height, setHeight] = useState(0)

  const handleBack = () => {
    if (backClick) {
      backClick();
    } else {
      window.MiniApp && window.MiniApp.navigateBack({
        delta: 1
      });
    }
  };

  useEffect(() => {
    window.MiniApp && window.MiniApp.getSystemInfo({
      success: res => {
        const height = Number(res.statusBarHeight || 0) * 2 + (res.brand === 'iphone' ? 24 : 20)
        setHeight(height)
      }
    });
  }, [])

  return (
    <header className="navigation-bar" style={{ height }}>
      {showback && (
        <span className="navigation-bar__icon">
          <i className="weui-icon-back-arrow-thin" onClick={handleBack} />
        </span>
      )}
      <div>{title}</div>
    </header>
  );
}
