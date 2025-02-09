import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";

export const Alert = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.alert.visible){
      const timer = setTimeout(() => {
        actions.hideAlert();
      },2000);
      return() => clearTimeout(timer);
    }
  }, [store.alert.visible, actions]);

  
  return (
    <div className={`container ${store.alert.visible ? '' : 'd-none'}`}>
      <div className={`alert alert-${store.alert.background}`} role="alert">
        {store.alert.text}
      </div>
    </div>
  );
};