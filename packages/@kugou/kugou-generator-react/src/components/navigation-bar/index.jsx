import React, { useEffect, useState } from "react";
import "./index.scss";
import Icon from '@/components/svg'

export default function NavigationBar(props) {
  const { title, showback, backClick } = props;
  const [statusBarHeight, setStatusBarHeight] = useState(0);

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
      success(res) {
        setStatusBarHeight(res.statusBarHeight);
      }
    });
  }, [])

  const top = Number(statusBarHeight || 0) + 5;

  return (
    <header className="navigation-bar" style={{ top }}>
      {showback && (
        <Icon className="navigation-bar-icon" iconClass="arrow" onClick={handleBack}></Icon>
      )}
      <div>{title}</div>
    </header>
  );
}
